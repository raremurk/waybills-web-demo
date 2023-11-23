import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, tap, catchError, throwError } from "rxjs";

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

	constructor(private snackBar: MatSnackBar) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap(e => {
				if (request.method == "POST" || request.method == "PUT" || request.method == "DELETE")
					if (e instanceof HttpResponse && (e.status == 201 || e.status == 204)) {
						this.snackBar.open('Операция прошла успешно', '', { duration: 2000 });
					}
			}),
			catchError((error: HttpErrorResponse) => {
				let errorMessage = ''
				if(error.status == 0){
					errorMessage = `Нет ответа от сервера`;
				}
				else{
					errorMessage = `${error.error.title}	Статус код: ${error.status}\nДетали: ${error.error.detail}`;
				}

				this.snackBar.open(errorMessage, 'Закрыть', { duration: 8000 });
				return throwError(() => { return errorMessage; });
			})
		)
	}
}