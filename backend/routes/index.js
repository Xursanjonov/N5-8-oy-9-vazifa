import express from "express"
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js"
import { auth } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
const router = express.Router()
// Blogs
router.get("/api/blogs", [auth, adminMiddleware], BlogsController.get)
router.get("/api/blogs/:id", [auth, adminMiddleware], BlogsController.getById)
router.post("/api/blogs", [auth, ownerMiddleware], BlogsController.create)
router.put("/api/blogs/:id", [auth, ownerMiddleware], BlogsController.update)
router.delete("/api/blogs/:id", [auth, ownerMiddleware], BlogsController.delete)
// Users
router.get('/api/profile', [auth, adminMiddleware], UsersController.getProfile)
router.get('/api/users', UsersController.getAllUsers)
router.get('/api/users/search', [auth, adminMiddleware], UsersController.getUserSearch)
router.post('/api/users/sign-up', [auth, ownerMiddleware], UsersController.registerUser)
router.post('/api/users/sign-in', [auth, ownerMiddleware], UsersController.loginUser)
router.patch('/api/users/:id', [auth, ownerMiddleware], UsersController.updateUser)

export default router

