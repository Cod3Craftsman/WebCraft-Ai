import express from "express"
import { generateWebsite } from "../controllers/website.controller.js"
const websiteRouter = express.Router()


websiteRouter.post("/generate" , generateWebsite)

export default websiteRouter;