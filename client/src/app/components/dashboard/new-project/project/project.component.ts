import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'np-project',
  templateUrl: './project.component.html'
})
export class NewProjectProjectComponent {
  @Input()
  public project: Project;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();
}
