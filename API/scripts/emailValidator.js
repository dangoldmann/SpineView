const deepValidator = require('deep-email-validator')
const simpleValidator = require('node-email-validation')

async function makeDeepValidation(email){
    return deepValidator.validate(email)
}

async function makeSimpleValidation(email){
    return simpleValidator.is_email_valid(email)
}

module.exports = {makeSimpleValidation, makeDeepValidation}