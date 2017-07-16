import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Place } from '../models/place';


@Injectable()
export class PlaceService {

  private placeApi = 'http://localhost:1337/place';  // URL to web API
  constructor(private http: Http) { }



    addPlace(place: any): Observable<any> {
      place.type=0;
      place.pos="0101000020E610000087527B116DE70240E25817B7D1704840";
    return this.http.post(this.placeApi, place)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  editPlace(id, update): Observable<any> {
    return this.http.put(this.placeApi + "/" + id, update)
      .map(this.extractObjectData)
      .catch(this.handleError);
  }
  deletePlace(id): Observable<any> {
    return this.http.delete(this.placeApi + "/" + id)
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
