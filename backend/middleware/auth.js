const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../model/user");


exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = res.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
})