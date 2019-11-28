import Ajv from "ajv";
import addAjvErrors from "ajv-errors";
import pointer from "json-pointer";
import CommonSchema from "./schema/common.json";
import SignUpSchema from "./schema/SignUp.json";
import EditProfileSchema from "./schema/EditProfile.json";

export const ajv = new Ajv({
  $data: true,
  allErrors: true,
  jsonPointers: true,
  schemas: {
    Common: CommonSchema,
    SignUp: SignUpSchema,
    EditProfile: EditProfileSchema
  }
});

addAjvErrors(ajv);

const sortErrorsByKey = errors => {
  let result = {};
  errors.forEach(error => {
    const { keyword, dataPath, params, message } = error;
    if (dataPath) {
      pointer.set(result, dataPath, error);
    } else if (keyword === "required") {
      result[params.missingProperty] = error;
    }
    if (keyword === "errorMessage" && !dataPath) {
      params.errors.forEach(oriError => {
        result[oriError.params.missingProperty] = {
          ...error,
          keyword: oriError.keyword
        };
      });
    }
  });
  return result;
};

const getMessageFromErrors = errors => {
  let messages = {};
  for (let key in errors) {
    messages = { ...messages, [key]: errors[key].message };
  }
  return messages;
};

export function normalizeSingleError(errors = [], prevErrors, currentTarget) {

  let errorMessages = {};
  const currentErrors = sortErrorsByKey(errors);
  const currentErrorKeys = Object.keys(currentErrors);
  const prevErrorKeys = Object.keys(prevErrors);

  currentErrorKeys.forEach(el => {
    if (
      prevErrorKeys.indexOf(el) === -1 &&
      el !== currentTarget &&
      currentErrors[el].keyword === "required"
    ) {
      delete currentErrors[el];
    }
  });
  return getMessageFromErrors(currentErrors);
}

export function normalizeAllErrors(errors = []) {
  const currentErrors = sortErrorsByKey(errors);
  return getMessageFromErrors(currentErrors);
}

export default function validate(data, schema) {
  const isValid = ajv.validate(schema, data);
  if (!isValid) {
    throw ajv.errors;
  }
  return isValid;
}
