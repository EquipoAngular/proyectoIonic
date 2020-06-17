import { mergeMap, finalize } from 'rxjs/operators';
import { Observable, timer, throwError } from 'rxjs';
import { SERVICES_RETRY } from '../models/consts';

// https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retrywhen
export const genericRetryStrategy = (
  {
    maxRetryAttempts = SERVICES_RETRY,
    scalingDuration = 1000,
    excludedStatusCodes = []
  }: {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}
) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find(e => e === error.status)) {
        return throwError(error);
      }
      console.log(`Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};
