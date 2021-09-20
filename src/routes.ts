import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import CategoriesController from "./app/controllers/CategoriesController";
import ProductController from "./app/controllers/ProductController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddlewares";

const router = Router()

//get User
router.get("/users/:id", authMiddleware, UserController.index)

//post User
router.post("/users", UserController.store)
router.post("/auth", AuthController.authenticate)

//put User
router.put("/user/update", authMiddleware, UserController.update)

//delet user
router.delete("/users/", authMiddleware, UserController.delete)

//getcategories
router.get("/categorie/", authMiddleware, CategoriesController.indexAll)
router.get("/categorie/:id", authMiddleware, CategoriesController.index)

//post categories
router.post("/categorie", authMiddleware, CategoriesController.store)

//path categories
router.patch("/categorie/:id", authMiddleware, CategoriesController.update)

//delete categories
router.delete("/categorie/:id", authMiddleware, CategoriesController.delete)

//get products
router.get("/product/:id", ProductController.index)
router.get("/product", ProductController.indexAll)

//post products
router.post("/product", authMiddleware, ProductController.store)

//patch products
router.patch("/product/:id", authMiddleware, ProductController.update)

//delete categories
router.delete("/product/:id", authMiddleware, ProductController.delete)

export default router