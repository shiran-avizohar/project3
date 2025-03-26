import { Router } from "express";
import { register } from "../controllers/registration/controller";
// import login from "../controllers/login/controller";

const router = Router();

// Route for user registration
router.post("/register", register);

// Route for user login
// router.post("/login", login);

export default router;
