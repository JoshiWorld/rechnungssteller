import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import 'bootstrap';
import { Article } from '../../interfaces/Article';
import { Location } from '@angular/common';
import { Order } from '../../interfaces/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  items: Order[] = []; // Replace with your actual data array
  pagedItems: Order[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;

  // @ts-ignore
  orderTitle: string;
  articles: Article[] = [];
  selectedArticles: Article[] = [];
  // @ts-ignore
  email: string;
  selectedArticle: any;

  dataSent: boolean = false;
  createdLink: string = '';

  constructor(private dataService: OrdersService, private location: Location) {}

  ngOnInit(): void {
    this.loadData();
  }

  addArticle(): void {
    if (this.selectedArticle) {
      this.selectedArticles.push(this.selectedArticle);
      this.selectedArticle = null;
    }
  }

  submitForm(): void {
    this.dataService.pushNewOrder(this.orderTitle, this.email, this.selectedArticles).subscribe(
      (response) => {
        console.log('Order submitted:', response);
        this.createdLink = 'https://shop.brokoly.de/order/' + response.uuid;
        this.dataSent = true;
      },
      (error) => {
        console.error('Error submitting the order:', error);
        // Handle the error as needed
      }
    );
  }

  removeItem(item: Order): void {
    this.dataService.removeArticle(item).subscribe(() => {
      // Item successfully removed
      this.location.back();
    }, (error) => {
      // Handle error
      console.error('Error removing item:', error);
    });
  }

  setPaid(item: Order): void {
    this.dataService.setPaid(item).subscribe(() => {
      // Item successfully paid
      this.location.back();
    }, (error) => {
      // Handle error
      console.error('Error paid item:', error);
    });
  }


  loadData(): void {
    this.dataService.getData().subscribe(data => {
      this.items = data;
      this.totalItems = this.items.length;
      this.pageChanged(this.currentPage);
    });

    this.dataService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  pageChanged(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }
}
