import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // enables "format": "email", "date-time", etc

export function validateSchema(schema: object, data: unknown) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  
  if (!valid) {
    throw new Error(`Schema validation failed: ${ajv.errorsText(validate.errors)}`);
  }
  
  return true;
}