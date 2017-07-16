import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


//const BASE_URL = 'http://94.23.218.120:1337';
const BASE_URL = 'http://localhost:1337/api';

function paramsToQueryString(params: any) {
    let result = [];

  /*  if (params.offset != null) {
        result.push(['_start', params.offset]);
    }*/
    if (params.limit != null) {
        result.push(['limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['sort', params.sortBy]);
    }
   /* if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? 'ASC' : 'DESC']);
    }*/

    return result.map(param => param.join('=')).join('&');
}
@Injectable()
export class RemoteService {

    constructor (private http: Http) {}

    queryUser(params: any) {
        return this.http.get(BASE_URL + '/user?' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => ({
                items: resp.json(),
                count: Number(resp.headers.get('X-Total-Count'))
            }));
    }
    queryPlace(params: any) {
        return this.http.get(BASE_URL + '/place?' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => ({
                items: resp.json(),
                count: Number(resp.headers.get('X-Total-Count'))
            }));
    }
    queryCoache(params: any) {
        return this.http.get(BASE_URL + '/coache?' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => ({
                items: resp.json(),
                count: Number(resp.headers.get('X-Total-Count'))
            }));
    }
    queryBooking(params: any) {
        return this.http.get(BASE_URL + '/booking?' + paramsToQueryString(params)).toPromise()
            .then((resp: Response) => ({
                items: resp.json(),
                count: Number(resp.headers.get('X-Total-Count'))
            }));
    }
}