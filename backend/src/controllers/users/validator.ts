import Joi from 'joi';

export const followVacationValidator = Joi.object({
    vacationId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required()
});

export const unfollowVacationValidator = Joi.object({
    vacationId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required()
});