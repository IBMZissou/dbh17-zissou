import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'np-client-info',
  templateUrl: './client-info.component.html'
})
export class NewProjectClientInfoComponent {
  @Input()
  public project: Project;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();
}
