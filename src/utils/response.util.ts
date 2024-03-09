import { Response } from 'express';

export function response(
  statusCode: number,
  message: string | Object,
  error: null | string,
  res: Response,
) {
  return res.status(statusCode).send({
    statusCode,
    message: [message],
    error,
  });
}
