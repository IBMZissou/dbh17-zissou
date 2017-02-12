import { Injectable } from '@angular/core';
import { Configuration } from '../app.constants';
import { AuthenticationService } from './authentication.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {
  private actionUrl: string;
  private singluarActionUrl: string;
  private headers: any;

  public constructor(
    private _http: Http,
    private _configuration: Configuration,
    private _authenticationService: AuthenticationService
  ) {
    this.actionUrl = `${_configuration.apiHost}${_configuration.apiPrefix}projects`;
    this.singluarActionUrl = `${_configuration.apiHost}${_configuration.apiPrefix}project`;
    this.headers = _authenticationService.createAuthorizationHeader();
  }

  public createProject(project: Project): Observable<any> {
    return this._http.post(this.actionUrl, project, {headers: this.headers})
      .map(res => res.json());
  }

  public getProjectsForCurrentUser(): Observable<Project[]> {
    return this._http.get(this.actionUrl, {headers: this.headers})
      .map(res => res.json());
  }

  public getProject(projectId: string): Observable<Project> {
    return this._http.get(this.singluarActionUrl + '/' + encodeURIComponent(projectId), {headers: this.headers})
      .map(res => res.json());
  }

  public signProject(projectId: string): Observable<Project> {
    return this._http.put(this.singluarActionUrl + '/' + encodeURIComponent(projectId) + '/sign', {headers: this.headers})
      .map(res => res.json());
  }
}
