import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  getUnits() {
    return this.http.get('/server/api/v1/units');
  }

  getUnit(id: number) {
    return this.http.get('/server/api/v1/units/' + id);
  }

  createUnitRegistration(unit) {
    let body = JSON.stringify(unit);
    return this.http.post('/server/api/v1/units', body, httpOptions);
  }
}
