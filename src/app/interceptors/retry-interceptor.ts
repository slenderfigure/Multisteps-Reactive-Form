import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";
import { RETRY_TOKEN } from "../services/controls.service";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): 
  Observable<HttpEvent<any>> {
    const retryCount = req.context.get(RETRY_TOKEN); 

    return next.handle(req).pipe(retry(retryCount));
  }
}