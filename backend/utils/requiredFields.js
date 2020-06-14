const ErrorResponse = require("./errorResponse");

// Create own require field error check for fields that
// are required in one role but not in the other.
// Ex: Doctor requires specialization but not phone
const requiredFields = (user, fieldsToCheck, next) => {
  let returnError = false
  let err = ""
  fieldsToCheck.forEach(field => {
    if(!user[field]){
      returnError = true
      err += `Required field ${field} is empty.`
    }
  })
  if (returnError) {
    next(new ErrorResponse(err, 400))
  }
  next();
}
module.exports = requiredFields;