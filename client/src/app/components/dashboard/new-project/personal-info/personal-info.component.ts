import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'np-personal-info',
  templateUrl: './personal-info.component.html'
})
export class NewProjectPersonalInfoComponent {
  @Input()
  public project: Project;

  @Output()
  public nextClicked = new EventEmitter<void>();
}
