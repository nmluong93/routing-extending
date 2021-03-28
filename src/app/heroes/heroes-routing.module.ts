import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';

const routes: Routes = [
  // migrate heroes links to superheroes
  { path: 'heroes', redirectTo: '/superheroes' },
  { path: 'hero/:id', redirectTo: '/superhero/:id' },
  { path: 'superheroes',  component: HeroListComponent, data :{Animation : 'heroes'} },
  { path: 'superhero/:id', component: HeroDetailComponent , data : {Animation: 'hero'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
