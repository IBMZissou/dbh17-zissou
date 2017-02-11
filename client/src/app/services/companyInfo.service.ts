import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs';

let encodeQueryData = (data: any): string => {
  let ret = [];

  for (let d of Object.keys(data)) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }

  return ret.join('&');
};

@Injectable()
export class CompanyInfoService {
  private actionUrl: string;

  constructor(
    private _http: Http,
    private _configuration: Configuration
  ) {
    this.actionUrl = `${_configuration.kvkApiHost}${_configuration.kvkApiPrefix}companies`;
  }

  public getCompanyByKvkNumber(kvkNumber): Observable<any> {
    return this._http
      .get(this.actionUrl + '/by-kvknumber/'+ kvkNumber +'?' + encodeQueryData({
          'api_key': this._configuration.kvkApiKey
      })).map(res => res.json());
  }
}
