import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/Article';
import { Order } from '../interfaces/Order'; // Assuming the Order interface is defined in a separate file

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://shop.brokoly.de/api/order/list/get?token=' + localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getData(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('https://shop.brokoly.de/api/article/get/list?token=' + localStorage.getItem('token'));
  }

  removeArticle(article: Order): Observable<void> {
    const deleteUrl = `https://shop.brokoly.de/api/order/${article.id}?token=${localStorage.getItem('token')}`;

    return this.http.delete<void>(deleteUrl);
  }

  setPaid(article: Order): Observable<void> {
    const paidUrl = `https://shop.brokoly.de/api/order/pay/${article.id}?token=${localStorage.getItem('token')}`;

    return this.http.get<void>(paidUrl);
  }


  pushNewOrder(title: string, email: string, articles: Article[]): Observable<Order> {
    return new Observable<any>((observer) => {
      this.http.post<any>('https://shop.brokoly.de/api/order/create?token=' + localStorage.getItem('token'), {
        order: {
          title: title,
          email: email
        }
      }).subscribe((response) => {
        console.log('Order created:', response);

        const orderId = response.id; // Assuming the response contains the order ID

        // Make the second POST request to add articles to the order
        this.http.post<any>('https://shop.brokoly.de/api/order/addArticles?token=' + localStorage.getItem('token'), {
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
