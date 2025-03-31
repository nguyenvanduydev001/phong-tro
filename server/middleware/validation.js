const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) throw new Error(error.details[0].message?.replaceAll('\"', ''))
    next()
}

module.exports = validate 