import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../interfaces/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  pageId: string | null = null;
  orderCode: string = '';
  orderContent: Order | undefined = undefined;
  isLoading: boolean = true;
  dataSent: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.pageId = this.route.snapshot.paramMap.get('id');
    this.checkPageId();
  }

  submitCode(): void {
    this.router.navigate(['/order', this.orderCode]);
    this.checkPageId();
  }


  submitData(): void {
    const url = 'http://localhost:3001/order/sendOrder';
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    this.http.put('http://localhost:3001/user/update/' + this.orderContent?.user.id, {
      updatedUser: this.orderContent?.user
    }, options).subscribe(
      (response) => {
        console.log('User updated!');
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    )

    this.http.post<Order>(url, { order: this.orderContent }, options).subscribe(
      (response) => {
        this.dataSent = true;
        console.log('Data sent!');
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }


  async checkPageId(): Promise<void> {
    if (this.checkPageIdIsNotNull()) {
      const orderExists = await this.checkPageIdOrderExists();
      if (orderExists) {
        console.log('Order exists');
      } else {
        console.log('Order does not exist');
      }

      this.isLoading = false;
    }
  }

  private checkPageIdOrderExists(): Promise<boolean> {
    const url = 'http://localhost:3001/order/' + this.pageId;
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return new Promise<boolean>((resolve, reject) => {
      this.http.get<Order>(url, options).subscribe(
        (response) => {
          this.orderContent = response;

          resolve(true); // Order exists
        },
        (error) => {
          console.error('Error checking order:', error);

          resolve(false); // Order doesn't exist or an error occurred
        }
      );
    });
  }


  private checkPageIdIsNotNull(): boolean {
    return !!this.pageId;
  }

  protected readonly undefined = undefined;
}
