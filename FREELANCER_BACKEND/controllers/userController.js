import userModel from "../models/userModel.js"
import createError from "../utils/createError.js";


export const deleteUser= async (req,res ,next)=>{

    const user= await userModel.findById(req.params.id);
    

        if(req.userId !== user._id.toString()){
            return next(createError(403,"You can delete only your account"))
        }
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send("user deleted");

};

// export const getUser= async (req,res ,next)=>{

//     const user= await userModel.findById(req.params.id);
    
//     res.status(200).send(user);

// };

export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return next(createError(404, "User not found"));

        // Send only necessary public details
        res.status(200).json({
            _id: user._id,
            username: user.username,
            img: user.img,
            country: user.country,
            desc: user.desc,
            isSeller: user.isSeller,  // Include isSeller
        });
    } catch (err) {
        next(err);
    }
};

