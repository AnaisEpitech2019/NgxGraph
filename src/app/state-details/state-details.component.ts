import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../node';
import { ActivatedRoute} from '@angular/router';
import { NodeService} from '../node.service';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.css']
})
export class StateDetailsComponent implements OnInit {
  @Input() node: Node;

  constructor(private route: ActivatedRoute, private nodeService: NodeService) { }

  ngOnInit() {
    this.getNode();
  }

  getNode(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.nodeService.getNode(id).subscribe(node => this.node = node);
  }
}
