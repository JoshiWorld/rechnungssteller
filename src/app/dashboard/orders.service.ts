import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/Article'; // Assuming the Order interface is defined in a separate file

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3001/order/list/get';

  constructor(private http: HttpClient) {}

  getData(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:3001/article/get/list');
  }

  pushNewOrder(title: string, email: string, articles: Article[]): Observable<Order> {
    return new Observable<any>((observer) => {
      this.http.post<any>('http://localhost:3001/order/create', {
        order: {
          title: title,
          email: email
        }
      }).subscribe((response) => {
        console.log('Order created:', response);

        const orderId = response.id; // Assuming the response contains the order ID

        // Make the second POST request to add articles to the order
        this.http.post<any>('http://localhost:3001/order/addArticles', {
          order: {
            id: orderId,
            articles: articles
          }
        }).subscribe((response2) => {
          console.log('Articles added to the order:', response2);
          observer.next(response); // Emit the response from the first request
          observer.complete();
        }, (error) => {
          console.error('Error adding articles to the order:', error);
          observer.error(error);
        });

      }, (error) => {
        console.error('Error creating the order:', error);
        observer.error(error);
      });
    });
  }
}
