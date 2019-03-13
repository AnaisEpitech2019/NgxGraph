import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import {colorSets} from '@swimlane/ngx-graph/release/utils';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-state-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './state-diagram.component.html',
  styleUrls: ['./state-diagram.component.css']
})
export class StateDiagramComponent implements OnInit {

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

  sampleNodes = [
    {
      id: 'start',
      label: 'Start',
      position: 'x0',
      color: '#4169E1'
    }, {
      id: '1',
      label: 'State#a',
      position: 'x1',
      color: '#008000'
    }, {
      id: '2',
      label: 'State#x',
      position: 'x2',
      color: '#008000'
    }, {
      id: '3',
      label: 'State#b',
      position: 'x3',
      color: '#008000'
    }, {
      id: '4',
      label: 'End#c',
      position: 'x4',
      color: '#FF0000'
    }, {
      id: '5',
      label: 'End#y',
      position: 'x5',
      color: '#FF0000'
    }, {
      id: '6',
      label: 'State#z',
      position: 'x6',
      color: '#008000'
    }, {
      id: '7',
      label: 'End#x',
      position: 'x7',
      color: '#FF0000'
    }
  ];

  sampleLinks = [ {
    source: 'start',
    target: '1',
    label: 'Process#1'
  }, {
    source: 'start',
    target: '2',
    label: 'Process#2'
  }, {
    source: '1',
    target: '3',
    label: 'Process#3'
  }, {
    source: '2',
    target: '4',
    label: 'Process#4'
  }, {
    source: '2',
    target: '6',
    label: 'Process#6'
  }, {
    source: '3',
    target: '5',
    label: 'Process#7'
  }, {
    source: '3',
    target: '1',
    label: 'ProcessReturn'
  }, {
    source: '6',
    target: '2',
    label: 'ProcessReturn'
  }, {
    source: '4',
    target: '2',
    label: 'ProcessReturn'
  }, {
    source: '5',
    target: '3',
    label: 'ProcessReturn'
  }, {
    source: '1',
    target: 'start',
    label: 'ProcessReturn'
  }, {
    source: '2',
    target: 'start',
    label: 'ProcessReturn'
  }, {
    source: '6',
    target: '7',
    label: 'Process#10'
  }, {
    source: '7',
    target: '6',
    label: 'ProcessReturn'
  }, {
    source: '6',
    target: '6',
    label: 'ProcessLoop'
  }
  ];

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

  constructor() {
    Object.assign(this, {
      colorSchemes: colorSets,
    });

    this.setColorScheme('picnic');
    this.setInterpolationType('Bundle');
  }

  ngOnInit() {
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
}