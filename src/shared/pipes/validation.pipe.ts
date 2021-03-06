import {
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import * as Joiful from 'joiful';
import { Constructor } from 'joiful/core';
import { MessageCodeError } from '../errors';

export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata):any {
    const resValue = this.validateAsClass(value, metadata);
    return resValue;
  }

  private validateAsClass(value: any, metadata: ArgumentMetadata):any {
    const { error, value: resValue } = Array.isArray(value)
      ? Joiful.validateArrayAsClass(value, metadata.metatype as Constructor<any>)
      : Joiful.validateAsClass(value, metadata.metatype as Constructor<any>);
    if (error) throw new MessageCodeError('validation:error', error.message);
    return resValue;
  }
}
