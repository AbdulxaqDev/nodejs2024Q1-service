import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { validate as uuidValidate } from 'uuid';

@ValidatorConstraint({ name: 'id', async: false })
export class IdValidator implements ValidatorConstraintInterface {
  validate(id: string, args: ValidationArguments): boolean | Promise<boolean> {
    return uuidValidate(id);
  }

  defaultMessage(args: ValidationArguments) {
    // Using contextual information to customize the error message
    return `The '${args.property}' is not valid.`;
  }
}
