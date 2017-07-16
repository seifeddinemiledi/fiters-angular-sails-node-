import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Coache } from '../models/coache';

@Injectable()
export class CoacheService {

  private coacheApi = 'http://localhost:1337/coache';  // URL to web API
  constructor(private http: Http) { }


  addCoache(coache: any): Observable<any> {
    coache.birthdate = Date.now().toString();
    return this.http.post(this.coacheApi, coache)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  editCoache(id, update): Observable<any> {
    return this.http.put(this.coacheApi + "/" + id, update)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  deleteCoache(id): Observable<any> {
    return this.http.delete(this.coacheApi + "/" + id)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  private extractArrayData(res: Response) {
    let body = res.json();
    return body || [];
  }
  private extractObjectData(res: Response) {
    let body = res.json();
   
    return body || {};
  }
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
