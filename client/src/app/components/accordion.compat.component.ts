import { Component } from '@angular/core';

@Component({
  selector: 'accordion-title',
  template: '<ng-content></ng-content>'
})
export class AccordionTitleCompatComponent {
}

@Component({
  selector: 'accordion-content',
  template: '<ng-content></ng-content>'
})
export class AccordionContentCompatComponent {
}
