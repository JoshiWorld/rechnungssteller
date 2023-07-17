import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import * as $ from 'jquery';
import 'bootstrap';
import { Article } from '../../interfaces/Article';

interface Order {
  id: number;
  title: string;
  uuid: string;
}

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

  constructor(private dataService: OrdersService) {}

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
        this.createdLink = 'http://localhost:4200/order/' + response.uuid;
        this.dataSent = true;
      },
      (error) => {
        console.error('Error submitting the order:', error);
        // Handle the error as needed
      }
    );
  }

  loadData(): void {
    // Replace this with your actual data retrieval logic
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
