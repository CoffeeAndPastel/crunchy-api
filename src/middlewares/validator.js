const boom = require("@hapi/boom");

function validatorHandler(schema, property = "body") {
    const validationOptions = { abortEarly: false, stripUnknown: true };

    return (req, res, next) => {
        const data = req[property];
        const { error, value } = schema.validate(data, validationOptions);

        if (error) {
            const message = error.details.map((e) => e.message).join(", ");
            next(boom.badRequest(message, { details: error.details }));
            return;
        }

        next();
    };
}

module.exports = { validatorHandler };
