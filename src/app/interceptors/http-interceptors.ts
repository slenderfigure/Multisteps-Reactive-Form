import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { RetryInterceptor } from "./retry-interceptor";

export const HttpInterceptorsProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true }
];