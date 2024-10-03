import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Compte, Operation } from '../models/compte.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  private log(response:any){
    console.table(response);
  }
  private handleError(error:Error, errorValue: any){
    console.error(error);
    return of(errorValue)
  }

  constructor(private http:HttpClient) { }


  getCompteByCode(codeCode: string): Observable<Compte>{
    return this.http.get<Compte>(`http://localhost:8080/api/showCompte/${codeCode}`)
    .pipe(
      tap((response)=>this.log(response)),
      catchError((error)=>this.handleError(error,undefined))
    );
  }

  saveOperation(operation: Operation): Observable<Operation> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    console.log('Operation to save:', operation);
  
    return this.http.post<Operation>('http://localhost:8080/api/saveOperation', operation, httpOptions)
      .pipe(
        tap((response) => {
          console.log('Operation saved successfully:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred while saving operation:', error);
          console.error('Response body:', error.error);
          console.error('Status code:', error.status);
  
          let errorMessage = 'An error occurred while saving the operation';
          if (error.error && error.error.message) {
            errorMessage = error.error.message; // Récupération du message d'erreur spécifique
          }
  
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  
  
}
