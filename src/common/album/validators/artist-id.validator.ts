import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'id', async: false })
export class IdValidator implements ValidatorConstraintInterface {
  validate(id: string): boolean | Promise<boolean> {
    return id === null;
  }

  defaultMessage(args: ValidationArguments) {
    // Using contextual information to customize the error message
    return `${args.property} should be null or string`;
  }
}
