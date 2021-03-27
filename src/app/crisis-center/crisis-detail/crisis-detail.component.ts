import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
 

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {

  crisis$!: Observable<Crisis | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
  ) { }

  ngOnInit() {
    // This will not reuse the crisis-detail component each time the url change to other id.
    // const id = this.route.snapshot.paramMap.get('id')!;
    // this.crisis$ = this.service.getcrisis(id);


    /**
     * Use the observable paramMap approach if there's a possibility that the router could re-use the component. 
     * This tutorial sample app uses with the observable paramMap.
     */
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getCrisis(params.get('id')!)
      )
    );
  }

  gotoCrisises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/