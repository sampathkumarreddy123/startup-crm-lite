import { validationResult } from "express-validator";

const validate = (validations) => {
  return async function (req, res, next) {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    next();
  };
};

export default validate;