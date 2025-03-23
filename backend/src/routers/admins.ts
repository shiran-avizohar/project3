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

const router = Router();

router.get('/:vacationId', paramsValidation(getVacationReportsValidator), getVacationReports);  
router.post('/', validation(addVacationValidator), addVacation);  
router.put('/:vacationId', validation(editVacationValidator), editVacation);  
router.delete('/:vacationId', paramsValidation(deleteVacationValidator), deleteVacation); 

export default router;