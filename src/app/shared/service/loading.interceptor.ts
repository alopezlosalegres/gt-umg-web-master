
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { LoadingService } from './loading.service';

import Swal from 'sweetalert2'

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    public activeRequest = 0;

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.activeRequest++;
        this.loadingService.setLoading(true);

        return next.handle(request).pipe(
            mergeMap(evt => {
                if (evt === null) {
                    return throwError('evt is null');
                } else {
                    if (evt instanceof HttpResponse) {
                        this.activeRequest--;
                        if (this.activeRequest <= 0) {
                            this.loadingService.setLoading(false);
                        }
                    }
                    return of(evt);
                }
            }),
            catchError(err => {
                this.activeRequest = 0;
                this.loadingService.setLoading(false);
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Error...!!!',
                    text: 'Lo sentimos, ocurrio un error ' + JSON.stringify(err),
                    allowOutsideClick: false
                })
                return throwError(err);
            })
        );
    }
}
