import { Link } from './link';

export const LINKS: Link[] = [
  {
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
