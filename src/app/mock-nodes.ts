import { Node } from './node';

export const NODES: Node[] = [
  {
    id: 'start',
    idObj: 0,
    label: 'Emis',
    color: '#4169E1'},
  {
    id: '1',
    idObj: 1,
    label: 'En instruction',
    color: '#008000'},
  {
    id: '2',
    idObj: 2,
    label: 'En attente RCC',
    color: '#008000'},
  {
    id: '3',
    idObj: 3,
    label: 'En attente RCM',
    color: '#008000'},
  {
    id: '4',
    idObj: 4,
    label: 'Bordereau Validé',
    color: '#008000'},
  {
    id: '5',
    idObj: 5,
    label: 'En attente RCD',
    color: '#008000'},
  {
    id: '6',
    idObj: 6,
    label: 'Traité hors REX Chaud',
    color: '#FF0000'},
  {
    id: '7',
    idObj: 7,
    label: 'Annulé',
    color: '#FF0000'},
  {
    id: '8',
    idObj: 8,
    label: 'Validé REX Chaud',
    color: '#FF0000'}
];
