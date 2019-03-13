import { Injectable } from '@angular/core';
import { Link } from './link';
import { LINKS } from './mock-links';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  getLinks(): Observable<Link[]> {
    return of(LINKS);
  }

  getLink(idObj: number): Observable<Link> {
    return of(LINKS.find(link => link.idObj === idObj));
  }
}
