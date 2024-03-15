import { DBs, Endpoints } from 'src/entities/common.entity';
import { validate } from 'uuid';
import { response } from './response.util';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function validateId(id: string, endPoint: Endpoints, res: Response) {
  if (validate(id)) {
    const db = DBs[endPoint];
    const item = db.find((i) => i.id === id);
    if (item) {
      return item;
    } else {
      response(
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
