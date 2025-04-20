import { Router } from "express";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/params-validation";
import { addVacationValidator,
    editVacationValidator,
    deleteVacationValidator,
    getVacationReportsValidator,
    } from "../controllers/admins/validator";
import { addVacation,
    editVacation, 
    deleteVacation, 
    getVacationReports
    } from "../controllers/admins/controller";
import { authenticateUser, authorizeAdmin } from "../middlewares/auth-middleware";
import { getVacations } from "../controllers/users/controller";
import upload from "../middlewares/multer-config";

const router = Router();

router.get('/:vacationId', authenticateUser, authorizeAdmin, paramsValidation(getVacationReportsValidator), getVacationReports);  
router.post('/', authenticateUser, authorizeAdmin, upload.single("imgFileName"), validation(addVacationValidator), addVacation);  
router.put('/vacations/:vacationId', authenticateUser, authorizeAdmin, upload.single("image"), validation(editVacationValidator), editVacation);  
router.delete('/:vacationId', authenticateUser, authorizeAdmin, paramsValidation(deleteVacationValidator), deleteVacation); 
router.get("/vacations",authenticateUser, authorizeAdmin, getVacations);

export default router;