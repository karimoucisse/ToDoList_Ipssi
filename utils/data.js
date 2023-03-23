const schemasFields = {
    user: ["email", "password"],
    list: ["name"],
    todo: ["status", "description"],
};
exports.verifyFields = (schema, data) => {
    const isFieldValid = Object.keys(data).every(key => schemasFields[schema].includes(key))
    return isFieldValid
};
