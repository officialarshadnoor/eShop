const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const { sendToken } = require("../utils/jwtToken");

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Create user endpoint
router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with the same email already exists
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            // Delete the uploaded file if user already exists
            const filePath = path.join("uploads/", req.file.filename);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error deleting file" });
                }
            });
            return next(new ErrorHandler("User already exists", 400));
        }

        // Handle file upload and avatar URL creation
        const fileUrl = req.file ? path.join("uploads/", req.file.filename) : '';

        // Create new user instance
        const newUser = await User.create({
            name,
            email,
            password,
            avatar: fileUrl,
        });

        // Create activation token and send activation email
        const activationToken = createActivationToken(newUser);
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;
        await sendMail({
            email: newUser.email,
            subject: "Activate your account",
            message: `Hello ${newUser.name}, please click on the link to activate your account: ${activationUrl}`,
        });

        res.status(201).json({ success: true, message: "Please check your email to activate your account." });
    } catch (err) {
        console.error("Error creating user:", err);
        return next(new ErrorHandler("Failed to create user", 500));
    }
});

// Activation endpoint
router.post("/activation", async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const decoded = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if (!decoded) {
            return next(new ErrorHandler("Invalid token", 400));
        }

        const { name, email, password, avatar } = decoded;
        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("You have already activated your account!", 400));
        }

        user = await User.create({
            name,
            email,
            password,
            avatar,
        });

        sendToken(user, 201, res);
    } catch (err) {
        console.error("Error activating user:", err);
        return next(new ErrorHandler(err.message, 500));
    }
});

// Login endpoint
router.post("/login-user", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please fill all the details!", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 400));
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid credentials", 400));
        }

        sendToken(user, 200, res);
    } catch (err) {
        console.error("Error logging in user:", err);
        return next(new ErrorHandler(err.message, 500));
    }
});

// Get user details endpoint
router.get("/getuser", isAuthenticated, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        console.error("Error fetching user:", err);
        return next(new ErrorHandler(err.message, 500));
    }
});

// Function to create activation token
const createActivationToken = (user) => {
    return jwt.sign({ user }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

module.exports = router;
