import { Component, Input, OnInit } from '@angular/core';
import { Visit } from 'src/app/common/visit';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css'],
})
export class VisitListComponent implements OnInit {
  @Input()
  visits: Visit[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.visits);
  }
}
