import {Component, OnInit} from '@angular/core';
import {PublicService} from '../service/public.service';
import {Parser} from '@angular/compiler';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../interface/cart';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.scss'
})
export class PublicHomeComponent  implements OnInit {

  books: any[] = [];
  booksCart: Cart[] = [];
  categories: any[] = [];
  selectCategories: any[] = [];
  authors: any[] = [];
  selectAuthors: any[] = [];
  responsiveOptions: any[] | undefined;
  layout: string = 'list';


  constructor(private publicService: PublicService, private toastrService: ToastrService, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.getResponsive();
    this.getAllBooks();
    this.getAllCategories();
    this.getAllAuthors();
  }
  getResponsive(){
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getAllBooks(){
    this.publicService.findAllBooks().subscribe({
      next: (data) => {
         this.books = data;
      },
      error: (err) => {}, complete: () => {}
    })
  }

  getAllCategories(){
    this.publicService.findAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {}, complete: () => {}
    })
  }

  getAllAuthors(){
    this.publicService.findAllAuthors().subscribe({
      next: (data) => {
        this.authors = data;
      },
      error: (err) => {}, complete: () => {}
    })
  }

  convertBufferToBase64(buffer: any): string {
    return `data:image/jpeg;base64,${buffer}`;
  }


  removeFilters(){
    this.selectAuthors = [];
    this.selectCategories = [];
  }


  addCart(book: any){
    let item = Number(localStorage.getItem('book'));
    if(item){
      localStorage.setItem('book', Number(item + 1).toString());
    }else{
      localStorage.setItem('book', Number(1).toString());
    }

    let books = localStorage.getItem('books');
    if(books) {
      this.booksCart = JSON.parse(books);
    }

    if(this.booksCart.find(item => item.id === book.id)){
      this.booksCart.forEach(item =>{if(item.id === book.id){item.qtd += 1}});
    }else {
      this.booksCart.push({id: book.id, book: book, qtd: 1});
    }

    let listBook = JSON.stringify(this.booksCart);
    localStorage.setItem('books', listBook)

    this.toastrService.success('Item Adicionado!')
    this.cartService.emitEvent(true);

  }

}
