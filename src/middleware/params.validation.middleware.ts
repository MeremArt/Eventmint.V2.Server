// validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestResponseWithError } from '../utils';

export function validateParamsDTO(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto: any = plainToInstance(dtoClass, req.params);

    validate(dto).then((errors) => {
      if (errors.length > 0) {
        const errorMessage = errors.map((error: any) => {
          return Object.values(error.constraints).join(', ');
          // return {
          //   message: `${error.property} has wrong value: ${error.value}`,
          //   constraints: Object.values(error.constraints).join(', '),
          // };
        });

        return BadRequestResponseWithError(res, errorMessage);
      } else {
        req.params = dto;
        next();
      }
    });
  };
}
