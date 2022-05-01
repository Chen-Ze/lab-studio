import {
  ExperimentWorkerPayload,
  ExperimentWorkerResponse,
} from '@lab-studio/api/experiment/experiment-worker';
import { plainToInstance } from 'class-transformer';

export function apiExperimentsUtil(): string {
  return 'api-experiments-util';
}

export function executeType(allocator: { new (): unknown }) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (
      payload: ExperimentWorkerPayload<unknown>,
      response: ExperimentWorkerResponse
    ) {
      const result = originalMethod.apply(this, [
        {
          ...payload,
          recipe: plainToInstance(allocator, payload.recipe),
        },
        response,
      ]);
      return result;
    };
  };
}
