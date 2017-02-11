import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'np-preview',
  templateUrl: './preview.component.html'
})
export class NewProjectPreviewComponent {
  @Input()
  public project: Project;

  @Output()
  public previousClicked = new EventEmitter<void>();

  @Output()
  public nextClicked = new EventEmitter<void>();
}
