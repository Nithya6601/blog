import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('Token in interceptor: ', token)
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`
        }
      });
      console.log('Outgoing Request: ',authReq)
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
