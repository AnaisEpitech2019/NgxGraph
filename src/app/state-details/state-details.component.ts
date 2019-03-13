import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../node';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.css']
})
export class StateDetailsComponent implements OnInit {
  @Input() node: Node;

  constructor() { }

  ngOnInit() {
  }

}
