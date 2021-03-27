import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';



const routes: Routes = [
  { path: 'crisises', component: CrisisListComponent, data: { Animation: 'crisises' } },
  { path: 'crisis/:id', component: CrisisDetailComponent, data: { Animation: 'crisis' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisisesRoutingModule { }
