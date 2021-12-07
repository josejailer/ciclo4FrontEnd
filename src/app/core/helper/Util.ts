import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class Util {

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
  
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
