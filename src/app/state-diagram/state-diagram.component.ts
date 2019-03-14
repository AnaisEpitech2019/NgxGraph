import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { any } from 'codelyzer/util/function';
import {colorSets} from '@swimlane/ngx-graph/release/utils';
import { NodeService } from '../node.service';
import { LinkService } from '../link.service';
import { Link } from '../link';
import { Node } from '../node';

@Component({
  selector: 'app-state-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './state-diagram.component.html',
  styleUrls: ['./state-diagram.component.css']
})
export class StateDiagramComponent implements OnInit {
  nodes: Node[];
  links: Link[];
  hierarchicalGraph = { nodes: [], links: [] };

  constructor(private nodeService: NodeService, private linkService: LinkService) {
    Object.assign(this, {
      colorSchemes: colorSets,
    });

    this.setColorScheme('picnic');
    this.setInterpolationType('Bundle');
  }

  view: any[];
  width = any;
  height = any;
  fitContainer = true;
  colorSchemes: any;
  colorScheme: any;
  selectedColorScheme: string;
// line interpolation
  curveType = 'Linear';
  curve = shape.curveBundle.beta(1);

  ngOnInit() {
    this.getNodes();
    this.getLinks();
    this.hierarchicalGraph.nodes = this.nodes;
    this.hierarchicalGraph.links = this.links;

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  select(data) {
    console.log('Item clicked', data);
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSchemes.find(s => s.name === name);
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  getNodes(): void {
   this.nodeService.getNodes().subscribe(nodes => this.nodes = nodes);
  }

  getLinks(): void {
    this.linkService.getLinks().subscribe(links => this.links = links);
  }
}
