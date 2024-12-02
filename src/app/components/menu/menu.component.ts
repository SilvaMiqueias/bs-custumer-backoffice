import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {ToastrService} from 'ngx-toastr';
import {Cart} from '../interface/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements  OnInit{

  values: number = 0;
  total: number = 0;
  books: Cart[] = [];
  sidebarVisible: boolean = false;


  constructor(private cartService: CartService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getValue();
    this.eventCart();
  }

  getValue(){
    let item = Number(localStorage.getItem('book'));
    if(item) {
       this.values = item;
    }

    let books = localStorage.getItem('books');
    if(books) {
      this.books = JSON.parse(books);
      this.books.forEach(item => {this.total += (item.book.price * item.qtd)});
    }
  }

  eventCart(){
    this.cartService.getEventObservable().subscribe({
      next: (data) => {
        this.values =  Number(localStorage.getItem('book'));
        let books = localStorage.getItem('books');
        this.total = 0;
        if(books) {
          this.books = JSON.parse(books);
          this.books.forEach(item => {this.total += (item.book.price * item.qtd)});
        }
      },
      error: () => {}, complete: () => {}
    })
  }

  showBooks(){
    if(this.values == 0){
      this.toastrService.info('O carrinho não contém item!')
    } else this.sidebarVisible = true;
  }

  convertBufferToBase64(buffer: any): string {
    return `data:image/jpeg;base64,${buffer}`;
  }

}
