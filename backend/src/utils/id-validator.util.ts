import { DBs, Endpoints } from 'src/entities/common.entity';
import { validate } from 'uuid';
import { response } from './response.util';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function validateId(
  id: string | null,
  endPoint: Endpoints,
  res: Response,
  isFavs = false,
) {
  if (validate(id)) {
    const db = DBs[endPoint];
    const item = db.find((i) => i.id === id);
    if (item) {
      return item;
    } else {
      isFavs
        ? response(
            HttpStatus.UNPROCESSABLE_ENTITY,
            `${endPoint.toUpperCase()} Not Found`,
            res,
          )
        : response(
            HttpStatus.NOT_FOUND,
            `${endPoint.toUpperCase()} Not Found`,
            res,
          );
    }
  } else {
    response(
      HttpStatus.BAD_REQUEST,
      `Invalid ${endPoint.toUpperCase()} ID`,
      res,
    );
  }
  return false;
}
