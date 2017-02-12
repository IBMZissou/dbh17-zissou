import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/index';
import { LoginComponent } from './components/login/login.component';
import { ThingsComponent } from './components/things/things.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OverviewComponent } from './components/dashboard/overview/overview.component';
import { NewProjectComponent } from './components/dashboard/new-project/newproject.component';
import { ProjectComponent } from './components/dashboard/project/project.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'things', component: ThingsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', component: OverviewComponent },
    { path: 'new', component: NewProjectComponent },
    { path: 'project/:id', component: ProjectComponent }
  ]},

  // otherwise redirect to login
  { path: '**', redirectTo: 'login' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
