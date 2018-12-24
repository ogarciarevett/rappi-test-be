require('rootpath')();
const Joi = require('joi');
const BadRequestError = require('app/utils/errors/BadRequestError');

const schemaParamId = Joi.object().keys({
    id: Joi.string()
});

const schemaSearch = Joi.object().keys({
    search: Joi.string()
});

class ProductValidator {
    static async validateIdParam(params) {
        if (typeof params !== 'object' || !params) throw new BadRequestError('Id param missing');
        const result = Joi.validate(params, schemaParamId);

        if (result.error) throw new BadRequestError(result.error.message);
        return true;
    }

    static async validateSearch(query) {
        if (typeof query !== 'object' || !query) throw new BadRequestError('Search query missing');
        const result = Joi.validate(query, schemaSearch);

        if (result.error) throw new BadRequestError(result.error.message);
        return true;
    }
}

module.exports = ProductValidator;
