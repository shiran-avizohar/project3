import { Router } from "express";
import { register } from "../controllers/registration/controller";
import login from "../controllers/login/controller";
// import login from "../controllers/login/controller";

const router = Router();

// Route for user registration
router.post("/api/register", register);

// Route for user login
router.post("/api/login", login);

export default router;
