import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crisis } from './crisis';
import { CRISISES } from './mock-crisises';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root',
})
export class CrisisService {

  constructor(private messageService: MessageService) { }

  getCrisises(): Observable<Crisis[]> {
    // TODO: send the message _after_ fetching the crisises
    this.messageService.add('CrisisService: fetched crisises');
    return of(CRISISES);
  }

  getCrisis(id: number | string) : Observable<Crisis | undefined> {
    return this.getCrisises().pipe(
      // (+) before `id` turns the string into a number
      map((crisises: Crisis[]) => crisises.find(crisis => crisis.id === +id))
    );
  }
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/