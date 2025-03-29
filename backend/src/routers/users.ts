import { Router } from "express";
import { getVacations, followVacation, unfollowVacation } from "../controllers/users/controller";
import { authenticateUser } from "../middlewares/auth-middleware";

// יצירת ראוטר חדש
const router = Router();

// Route to get all vacations with associated users
router.get("/vacations", getVacations);

// Route to allow a user to follow a vacation
router.post("/follow", authenticateUser, followVacation); // קריאה לפונקציה followVacation מהקונטרולר

// Route to allow a user to unfollow a vacation
router.delete("/unfollow/:vacationId/:userId", unfollowVacation); // קריאה לפונקציה unfollowVacation מהקונטרולר

export default router;

