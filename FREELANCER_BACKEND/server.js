import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection.js";

import userRoute from "./routes/userRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import gigRoute from "./routes/gigRoute.js";
import messageRoute from "./routes/messageRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

const app = express();





app.use(cors({origin:["http://localhost:5173", "https://freelancer-project-frontend.onrender.com"],credentials:true})); // Enable CORS for frontend requests
app.use(express.json()); //middleware
app.use(cookieParser());



// ✅ Ensure MongoDB connects before starting the server
connectDB();

// Define Routes
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/auth", authRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
})


  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
