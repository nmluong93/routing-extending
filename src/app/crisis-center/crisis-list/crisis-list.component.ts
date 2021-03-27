import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/message.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { Crisis } from '../crisis';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.scss']
})
export class CrisisListComponent implements OnInit {

  selectedCrisis! : Crisis;

  crisises$!: Observable<Crisis[]>;
  selectedId!: number;

  constructor(private service: CrisisService, 
    private messageService: MessageService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.crisises$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id')!;
        return this.service.getCrisises();
      })
    );
  }

  onSelect(crisis: Crisis): void {
    this.selectedCrisis = crisis;
    this.messageService.add(`CrisisesComponent: Selected crisis id=${crisis.id}`);
  }


}
