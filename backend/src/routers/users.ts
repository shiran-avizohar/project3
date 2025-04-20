import { Router } from "express";
import { getVacations, followVacation, unfollowVacation } from "../controllers/users/controller";
import { authenticateUser } from "../middlewares/auth-middleware";


const router = Router();
// Route to get all vacations with associated users
router.post("/vacations", getVacations);

// Route to allow a user to follow a vacation
router.post("/follow", authenticateUser, followVacation); 

// Route to allow a user to unfollow a vacation
router.delete("/unfollow/:vacationId/:userId", unfollowVacation);

export default router;

