import { DBs, Endpoints } from 'src/entities/common.entity';
import { validate } from 'uuid';
import { response } from './response.util';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export async function validateId(
  id: string | null,
  endPoint: Endpoints,
  res: Response,
  isFavs: boolean = false,
) {
  if (validate(id)) {
    const item = await DBs[endPoint].findUnique({
      where: {
        id,
      },
    });

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
