import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  // to not be complained as null possiblility.
  hero$?: Observable<Hero>;
  selectedId? : number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}
// https://stackoverflow.com/questions/48356320/unable-to-parse-optional-routing-parameters-in-angular

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('id') != null ? +params.get('id') : 1;
       return  this.service.getHero(this.selectedId)
      })
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/