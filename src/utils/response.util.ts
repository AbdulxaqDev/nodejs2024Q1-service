import { Response } from 'express';

export function response(
  statusCode: number,
  message: string | Object,
  res: Response,
) {
  return res.status(statusCode).json(message);
}
