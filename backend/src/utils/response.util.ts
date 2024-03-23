import { Response } from 'express';

export function response(
  statusCode: number,
  // eslint-disable-next-line
  message: string | Object,
  res: Response,
): Response {
  return res.status(statusCode).json(message);
}
