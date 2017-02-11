import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { Configuration } from './app.constants';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { AuthGuard } from './guards/index';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ThingsComponent } from './components/things/things.component';
import { ThingService } from './services/thing.service';
import { CompanyInfoService } from './services/companyinfo.service';
import { AuthenticationService } from './services/authentication.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { NewProjectComponent } from './components/dashboard/new-project/newproject.component';
import { NewProjectPersonalInfoComponent } from './components/dashboard/new-project/personal-info/personal-info.component';
import { NewProjectClientInfoComponent } from './components/dashboard/new-project/client-info/client-info.component';
import { NewProjectProjectComponent } from './components/dashboard/new-project/project/project.component';
import { NewProjectQuestionnaireComponent } from './components/dashboard/new-project/questionnaire/questionnaire.component';
import { NewProjectPreviewComponent } from './components/dashboard/new-project/preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThingsComponent,
    DashboardComponent,
    OverviewComponent,
    NewProjectComponent,
    NewProjectPersonalInfoComponent,
    NewProjectClientInfoComponent,
    NewProjectProjectComponent,
    NewProjectQuestionnaireComponent,
    NewProjectPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgSemanticModule
  ],
  providers: [
    appRoutingProviders,
    Configuration,
    AuthenticationService,
    AuthGuard,
    ThingService,
    CompanyInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
