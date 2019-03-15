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
    this.setInterpolationType();
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
  curveLines: any;

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

  setInterpolationType() {
    if (this.curveType === 'Bundle') {
      this.curveLines = shape.curveBundle.beta(1);
    }
    if (this.curveType === 'Cardinal') {
      this.curveLines = shape.curveCardinal;
    }
    if (this.curveType === 'Catmull Rom') {
      this.curveLines = shape.curveCatmullRom;
    }
    if (this.curveType === 'Linear') {
      this.curveLines = shape.curveLinear;
    }
    if (this.curveType === 'Monotone X') {
      this.curveLines = shape.curveMonotoneX;
    }
    if (this.curveType === 'Monotone Y') {
      this.curveLines = shape.curveMonotoneY;
    }
    if (this.curveType === 'Natural') {
      this.curveLines = shape.curveNatural;
    }
    if (this.curveType === 'Step') {
      this.curveLines = shape.curveStep;
    }
    if (this.curveType === 'Step After') {
      this.curveLines = shape.curveStepAfter;
    }
    if (this.curveType === 'Step Before') {
      this.curveLines = shape.curveStepBefore;
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
