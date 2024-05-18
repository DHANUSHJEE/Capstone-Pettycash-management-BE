import express from "express";
import { loginController, registerController, verifyEmail } from "../controllers/userController.js";





//route object 
const router = express.Router();



//routers  

//POST && REGISTER
router.post("/register", registerController)

//activation link
router.get("/:id/verify/:token", verifyEmail)

//POST && LOGIN
router.post("/login", loginController)







export default router