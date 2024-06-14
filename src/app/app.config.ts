import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { getRussianPaginatorIntl } from "./paginator.internationalization";
import { SnackbarInterceptor } from "./snackbar.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideNativeDateAdapter(),
    provideRouter(routes),
    {provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {subscriptSizing: 'dynamic'}},
    {provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl()}
  ],
};
