import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  isExpanded: boolean = true;
  constructor() { }
}
