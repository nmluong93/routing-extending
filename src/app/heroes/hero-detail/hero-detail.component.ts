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

  hero$!: Observable<Hero | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {
    // This will not reuse the hero-detail component each time the url change to other id.
    // const id = this.route.snapshot.paramMap.get('id')!;
    // this.hero$ = this.service.getHero(id);


    /**
     * Use the observable paramMap approach if there's a possibility that the router could re-use the component. 
     * This tutorial sample app uses with the observable paramMap.
     */
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getHero(params.get('id')!)
      )
    );
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    // this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
    this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/