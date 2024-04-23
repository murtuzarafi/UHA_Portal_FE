import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class NgxHttpInterceptor implements HttpInterceptor {

  private count = 0;

  constructor(private ngxService: NgxUiLoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ngxService.start();
    this.count++;
    return next.handle(req).pipe(
      catchError(error => {
        return of(error);
      }),
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.ngxService.stop();
        }
      })
    );
  }
}