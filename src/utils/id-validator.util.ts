import { Response } from 'express';
import { validate } from 'uuid';

export function isValidId(id: string) {
  const response = { statusCode: 200, message: [], error: null };
  if (validate(id)) {
    response.message = [this.userService.findOne(id)];
  } else {
    response.statusCode = 400;
    response.message = ['Invalid User Id'];
    response.error = 'Bad Request';
  }
  return response;
}
