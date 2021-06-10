const schemes = require("./scheme-model");
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  schemes.findById(req.params.scheme_id)
  .then(scheme=>{
    if(!scheme){
      next({
        status:404,
        message:`scheme with scheme_id ${req.params.scheme_id} not found`
      })
    }else{
      next()
    }
  })
  .catch(error=>{
    next({
      status:404,
      message:`scheme with scheme_id ${req.params.scheme_id} not found`
    })
  });
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body;
  if(!scheme_name || typeof scheme_name !== "string"){
    next({
      status:400,
      message:"invalid scheme_name"
    });
  }else{
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {instructions,step_number} = req.body;
  if(!instructions || 
    typeof instructions !== "string" || 
    step_number < 1 ||
    typeof step_number !== "number"){
    next({
      status:400,
      message: "invalid step"
    });
  }else{
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
