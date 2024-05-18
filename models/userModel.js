import mongoose from "mongoose";


  const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "name is required"]},
    email: {type: String, required: [true, "email is required"]},
    password: { type: String, required: [true, "password is required"] },
    verified: { type: Boolean, default: false },
    
  },
      { timestamps: true }
  )


//export model
export default mongoose.model("User", userSchema)