import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonComponent } from './mat-button.component';



@NgModule({
  declarations: [MatButtonComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [MatButtonComponent]
})
export class MatButtonModule {
}
