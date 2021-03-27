import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/heroes/hero';
import { MessageService } from 'src/app/message.service';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  selectedHero! : Hero;

  heroes$!: Observable<Hero[]>;
  selectedId!: number;

  constructor(private service: HeroService, 
    private messageService: MessageService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id')!;
        return this.service.getHeroes();
      })
    );
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }


}
