import * as Joi from 'joi';

export const tasksSchema = {
    create: Joi.object().keys({
        description: Joi.string().required(),
        dueAt: Joi.date().required()
    }),
    update: Joi.object().keys({
        description: Joi.string(),
        dueAt: Joi.date()
    }).or('description', 'dueAt')
}
