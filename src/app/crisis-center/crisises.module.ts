import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrisisesRoutingModule } from './crisises-routing.module';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';


@NgModule({
  declarations: [
    CrisisListComponent,
    CrisisDetailComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CrisisesRoutingModule,
  ]
})
export class CrisisesModule { }
