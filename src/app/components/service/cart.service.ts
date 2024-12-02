import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private eventCart = new Subject<any>();

  constructor() { }

  emitEvent(eventData: any): void{
    this.eventCart.next(eventData);
  }

  getEventObservable(){
    return this.eventCart.asObservable();
  }



}
