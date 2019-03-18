import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { any } from 'codelyzer/util/function';
import {colorSets, id} from '@swimlane/ngx-graph/release/utils';
import { NodeService } from '../node.service';
import { LinkService } from '../link.service';
import { Link } from '../link';
import { Node } from '../node';
import { Graph, Edge, Layout } from '../app.module';

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
  curveType = 'Step After';
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
    switch (this.curveType) {
      case 'Bundle':
        this.curveLines = shape.curveBundle.beta(1);
        break;
      case 'Cardinal':
        this.curveLines = shape.curveCardinal;
        break;
      case 'Catmull Rom':
        this.curveLines = shape.curveCatmullRom;
        break;
      case 'Linear':
        this.curveLines = shape.curveLinear;
        break;
      case 'Monotone X':
        this.curveLines = shape.curveMonotoneX;
        break;
      case 'Monotone Y':
        this.curveLines = shape.curveMonotoneY;
        break;
      case 'Natural':
        this.curveLines = shape.curveNatural;
        break;
      case 'Step':
        this.curveLines = shape.curveStep;
        break;
      case 'Step After':
        this.curveLines = shape.curveStepAfter;
        break;
      case 'Step Before':
        this.curveLines = shape.curveStepBefore;
        break;
      default:
        this.curveLines = shape.curveLinear;
        break;
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
