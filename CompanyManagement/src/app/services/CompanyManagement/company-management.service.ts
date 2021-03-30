import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyModel } from 'src/app/models/company-model';

@Injectable({
  providedIn: 'root',
})
export class CompanyManagementService {
  private readonly dataURL = '../../../../assets/data/company-data.json';
  private readonly url = 'http://localhost:3000/companies/';
  constructor(private http: HttpClient) {}

  getId() {
    return new Promise((resolve, reject) => {
      let maxId = 0;
      this.http
        .get<CompanyModel[]>(this.url)
        .subscribe((resp: CompanyModel[]) => {
          resp.map((ele) => {
            ele.id = parseInt('' + ele.id);
            console.log(ele);

            if (ele.id > maxId) {
              maxId = ele.id;
            }
          });
          return resolve(++maxId);
        });
    });
  }
  getAllCompanies() {
    return this.http
      .get<CompanyModel[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  getCompanyById(id: any) {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addCompany(company: CompanyModel) {
    return this.http.post(this.url, company).pipe(catchError(this.handleError));
  }

  updateCompany(company: CompanyModel) {
    return this.http
      .put(`${this.url}/${company.id}`, company)
      .pipe(catchError(this.handleError));
  }

  deleteCompany(id: any) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(
        `Backend returned code ${err.status}, ` + `body was: ${err.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }
}
