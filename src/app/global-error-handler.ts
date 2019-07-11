import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class GloalErrorHandler implements ErrorHandler {
    constructor(// Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
        private injector: Injector) { }
    handleError(errorResponse: Error | HttpErrorResponse) {
        const notificationService = this.injector.get(NzNotificationService);
        const router = this.injector.get(Router);
        if (errorResponse instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                return notificationService.error(
                    'No Internet Connection',
                    'I will never close automatically. I will be close automatically. I will never close automatically.',
                    { nzDuration: 2000 }
                    );
            } else {
                if (errorResponse.status === 400) {
                    return notificationService.error(
                        errorResponse.error.status,
                        errorResponse.error.message,
                        { nzDuration: 2000 }
                        );
                } else {
                    // Handle Http Error (error.status === 403, 404...)
                    return notificationService.warning(
                        errorResponse.status.toString(),
                        errorResponse.message,
                        { nzDuration: 2000 }
                        );
                }
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)
            return notificationService.error(
                errorResponse.name,
                errorResponse.message,
                { nzDuration: 2000 }
                );
        }
        // Log the error anyway
        console.error('It happens: ', errorResponse);
    }
}
