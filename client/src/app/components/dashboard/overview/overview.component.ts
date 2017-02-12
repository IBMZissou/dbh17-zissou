import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: [ './overview.component.scss' ]
})
export class OverviewComponent implements OnInit {
  public projects: Project[] = [];

  public constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  public convertDate(timestamp: number): string {
    return new Date(timestamp).toDateString();
  }

  public ngOnInit(): void {
    this.projectService.getProjectsForCurrentUser().subscribe(
      (projects: Project[]) => this.projects = projects
    );
  }

  public showProject(project: Project): void {
    this.router.navigate(['/dashboard/project/', project.projectID]);
  }
}
