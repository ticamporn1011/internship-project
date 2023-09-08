import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Group, Product } from './information.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  productLists: Product[] = [];

  constructor(private http: HttpClient) {}

  productArray(productLists: Product[]) {
    return productLists;
  }

  getProduct(
    pageIndex: number,
    pageSize: number
  ): Observable<{
    count: number;
    results: Product[];
  }> {
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;

    return this.http
      .get<{
        count: number;
        results: Product[];
      }>('http://127.0.0.1:8080/api/products')
      .pipe(
        map((data) => {
          return {
            count: data.results.length,
            results: data.results.slice(start, end),
          };
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  update(
    group: Group[],
    propValueMain: string = 'hi',
    propValueSub: string = 'hello'
  ): Observable<void> {
    return new Observable((observer) => {
      for (const g of group) {
        for (const m of g.group) {
          const found = this.productLists.find((l) => l.sku === m.sku);
          if (found) {
            found.propValueMain = propValueMain;

            found.propValueSub = propValueSub;
          } else {
            console.log('not found');
          }
        }
      }

      observer.next();
      observer.complete();
    });
  }
}
