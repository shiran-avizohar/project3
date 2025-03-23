import Joi from 'joi';

export const addVacationValidator = Joi.object({
    vacationDestination: Joi.string().max(255).required(),
    vacationDescription: Joi.string().max(500).required(),
    vacationDateStart: Joi.date().required(),
    vacationDateEnd: Joi.date().required(),
    price: Joi.number().min(0).required(),
    imgFileName: Joi.string().max(255).required()
});

export const editVacationValidator = Joi.object({
    vacationDestination: Joi.string().max(255).optional(),
    vacationDescription: Joi.string().max(500).optional(),
    vacationDateStart: Joi.date().optional(),
    vacationDateEnd: Joi.date().optional(),
    price: Joi.number().min(0).optional(),
    imgFileName: Joi.string().max(255).optional()
});

export const deleteVacationValidator = Joi.object({
    vacationId: Joi.string().uuid().required() // מוודא שהמזהה הוא UUID תקני
});

export const getVacationReportsValidator = Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional()
});