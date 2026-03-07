import express from "express"
import { googleAuth, logOut } from "../controllers/auth.controller.js"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"
const authRouter = express.Router()


authRouter.post("/google" , googleAuth)
authRouter.get("/logout" , logOut)

export default authRouter;