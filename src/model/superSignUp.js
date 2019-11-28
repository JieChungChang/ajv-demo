import validate from "./validator";

const SCHEMA_ID = "http://ajv-demo/superSignUp.json";

export const validateForSuperSignUp = data =>
  validate(data, `${SCHEMA_ID}#/definitions/ForSuperSignUp`);