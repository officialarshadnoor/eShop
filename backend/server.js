const app = require("./app");
const connectDatabase = require("./db/Database");

// handling uncought exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`);

})  

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//connect db
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down server for unhandled promise rejection`);
    server.close(()=> {
        process.exit(1);
    })
})