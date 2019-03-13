import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import {colorSets} from '@swimlane/ngx-graph/release/utils';
import {any} from 'codelyzer/util/function';
import { NodeService } from '../node.service';
import { LinkService } from '../link.service';
import {Link} from '../link';

@Component({
  selector: 'app-state-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './state-diagram.component.html',
  styleUrls: ['./state-diagram.component.css']
})
export class StateDiagramComponent implements OnInit {

  constructor(private nodeService: NodeService, private linkService: LinkService) {
    Object.assign(this, {
      colorSchemes: colorSets,
    });

    this.setColorScheme('picnic');
    this.setInterpolationType('Bundle');
  }

  hierarchicalGraph = { nodes: [], links: [] };

  view: any[];
  width = any;
  height = any;
  fitContainer = true;
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = true;
  colorSchemes: any;
  colorScheme: any;
  schemeType = 'ordinal';
  selectedColorScheme: string;

  sampleNodes: Node[];

  sampleLinks: Link[];

  // options
  showLegend = true;
  orientation = 'LR'; // LR, RL, TB, BT
  orientations: any[] = [
    {
      label: 'Left to Right',
      value: 'LR'
    },
    {
      label: 'Right to Left',
      value: 'RL'
    },
    {
      label: 'Top to Bottom',
      value: 'TB'
    },
    {
      label: 'Bottom to Top',
      value: 'BT'
    }
  ];

  // line interpolation
  curveType = 'Linear';
  curve = shape.curveBundle.beta(1);
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  selectedNode: Node;

  ngOnInit() {
    this.getNodes();
    this.getLinks();
    this.hierarchicalGraph.nodes = this.sampleNodes;
    this.hierarchicalGraph.links = this.sampleLinks;

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleEnableZoom(enableZoom: boolean) {
    this.enableZoom = enableZoom;
  }

  toggleFitContainer(fitContainer: boolean, autoZoom: boolean, autoCenter: boolean): void {
    this.fitContainer = fitContainer;
    this.autoZoom = autoZoom;
    this.autoCenter = autoCenter;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
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

  toggleExpand(node) {
    console.log('toggle expand', node);
  }

  updateChart() {
    // this.update$.next(true);
  }

  zoomToFit() {
    // this.zoomToFit$.next(true);
  }

  center() {
    // this.center$.next(true);
  }

  getNodes(): void {
    this.nodeService.getNodes().subscribe(nodes => this.sampleNodes = nodes);
  }

  getLinks(): void {
    this.linkService.getLinks().subscribe(links => this.sampleLinks = links);
  }
  onSelect(node: Node): void {
    this.selectedNode = node;
  }
}
