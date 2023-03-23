const SchemasFields = {
    User: ["isAdmin","email","password","lists"],
    List: [],
    Todo: [],
}

exports.verifySchemafields = (schema, data) => {
    const schemaToverify = SchemasFields[`${schema}`]
    for(let key in data){
        if(!key in schemaToverify){
            return false
        }
    }
    return true
}