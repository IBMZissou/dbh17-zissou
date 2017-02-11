import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Configuration {
  public apiHost: string = environment.apiHost;
  public apiPrefix: string = environment.apiPrefix;
  public kvkApiHost: string = environment.kvkApiHost;
  public kvkApiPrefix: string = environment.kvkApiPrefix;
  public kvkApiKey: string = environment.kvkApiKey;
}
