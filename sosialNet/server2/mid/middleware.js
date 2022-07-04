const Joi = require('joi')

exports.valid = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(50).required()
    })
    return schema.validate(data);
}

