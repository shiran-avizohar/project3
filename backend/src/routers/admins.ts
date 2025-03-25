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

const router = Router();

router.get('/:vacationId', authenticateUser, authorizeAdmin, paramsValidation(getVacationReportsValidator), getVacationReports);  
router.post('/', authenticateUser, authorizeAdmin, validation(addVacationValidator), addVacation);  
router.put('/:vacationId', authenticateUser, authorizeAdmin, validation(editVacationValidator), editVacation);  
router.delete('/:vacationId', authenticateUser, authorizeAdmin, paramsValidation(deleteVacationValidator), deleteVacation); 

export default router;