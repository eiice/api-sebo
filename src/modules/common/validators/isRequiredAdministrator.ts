import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'isRequiredIfAdministrator', async: false })
export class IsRequiredIfAdministrator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [area] = args.constraints;
    const type = args.object['type'];

    if (type === 'administrator') {
      return value !== undefined;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [area] = args.constraints;
    return `The ${area} field is required when 'type' is set to 'administrator'.`;
  }
}