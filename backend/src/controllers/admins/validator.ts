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
    vacationDescription: Joi.string().max(5000).optional(),
    vacationDateStart: Joi.date().optional(),
    vacationDateEnd: Joi.date().optional(),
    imgFileName: Joi.string().max(255).optional(),
    price: Joi.number().min(0).optional(),
});

export const deleteVacationValidator = Joi.object({
    vacationId: Joi.string().uuid().required() 
});

export const getVacationReportsValidator = Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional()
});