import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { DialogService } from 'src/app/dialog.service';
 

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.scss']
})
export class CrisisDetailComponent implements OnInit {

  crisis!: Crisis;
  editName! : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    // This will not reuse the crisis-detail component each time the url change to other id.
    // const id = this.route.snapshot.paramMap.get('id')!;
    // this.crisis$ = this.service.getcrisis(id);


    /**
     * Use the observable paramMap approach if there's a possibility that the router could re-use the component. 
     * This tutorial sample app uses with the observable paramMap.
     * 
        this.crisis$ = this.route.paramMap.pipe(
          switchMap((params: ParamMap) => this.service.getCrisis(params.get('id')!))
        );
     */
    
    this.route.data
      .subscribe((data: { crisis?: Crisis }) => {
        this.editName = data.crisis!.name;
        this.crisis = data.crisis!;
      });
  }

  gotoCrises(crisis?: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }
  cancel() {
    this.gotoCrises();
  }

  // canDeactivate(): Observable<boolean> | boolean {
  //   // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
  //   if (!this.crisis || this.crisis.name === this.editName) {
  //     return true;
  //   }
  //   // Otherwise ask the user with the dialog service and return its
  //   // observable which resolves to true or false when the user decides
  //   return this.dialogService.confirm('Discard changes?');
  // }
}
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/