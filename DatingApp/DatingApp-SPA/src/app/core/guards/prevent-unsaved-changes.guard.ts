import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface DeactivableComponent {
  beDeactive(): boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<DeactivableComponent> {
  canDeactivate(component: DeactivableComponent) {
    return component.beDeactive();
  }
}
