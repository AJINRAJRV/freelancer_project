import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";


//This middleware verifies the JWT token from the user's request (stored in cookies). 
// If the token is valid, it extracts user details (user ID and seller status) and attaches them to the request object.
export const verifyToken = (req,res,next)=> {

    //  Retrieve token from cookies
    const token=req.cookies.accessToken;
    if(!token) return next(createError(401,"You are not authenticated!"));

    //  Verify the token using the secret key
    jwt.verify(token,process.env.JWT_KEY ,async (err,payload)=>{

        if (err) return next(createError(403,"Token is not valid!"));

         //  Attach user details to the request object for further use
        req.userId=payload.id;
        req.isSeller=payload.isSeller;

        next();  //  Proceed to the next middleware or route handler
    });
}
