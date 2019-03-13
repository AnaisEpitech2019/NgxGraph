import { Injectable } from '@angular/core';
import { Node } from './node';
import { NODES } from './mock-nodes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor() { }

  getNodes(): Observable<Node[]> {
    return of(NODES);
  }

  getNode(idObj: number): Observable<Node> {
    return of(NODES.find(node => node.idObj === idObj));
  }
}
