import express from "express"
import { generateWebsite, getWebsiteById , getAll, changes, deploy, getBySlug} from "../controllers/website.controller.js"
import isAuth from "../middlewares/isAuth.js";
const websiteRouter = express.Router()


websiteRouter.post("/generate" , isAuth, generateWebsite)
websiteRouter.put("/update/:id" , isAuth, changes)
websiteRouter.get("/get-by-id/:id" , isAuth, getWebsiteById)
websiteRouter.get("/get-all" , isAuth, getAll)
websiteRouter.get("/deploy/:id", isAuth , deploy)
websiteRouter.get("/get-by-slug/:slug" , getBySlug)

export default websiteRouter;
