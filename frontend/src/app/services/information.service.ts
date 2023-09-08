import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, Subject, of } from 'rxjs';

export interface Product {
  title: string;
  sku: string;
  btnDisable: boolean;
  checked: boolean;
  switched: boolean;
  propNameMain: string;
  propValueMain: string;
  propNameSub: string;
  propValueSub: string;
}

export interface Group {
  id: string;
  groupName: string;
  group: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  constructor(private http: HttpClient) {}

  private dataUpdatedSubject = new Subject<void>();

  get dataUpdated$() {
    return this.dataUpdatedSubject.asObservable();
  }

  triggerDataUpdate() {
    this.dataUpdatedSubject.next();
  }

  getAllProduct(input: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Observable<{
    count: number;
    results: Product[];
  }> {
    const start = (input.pageIndex - 1) * input.pageSize;
    const end = start + input.pageSize;

    return this.http
      .get<{
        count: number;
        results: Product[];
      }>('http://127.0.0.1:8080/api/products')
      .pipe(
        map((data) => {
          const dataSearch = input.search
            ? data.results.filter(
                (x) =>
                  (x.title || '')
                    .toLowerCase()
                    .indexOf(input.search.toLowerCase()) !== -1 ||
                  (x.sku || '')
                    .toLowerCase()
                    .indexOf(input.search.toLowerCase()) !== -1
              )
            : data.results;
          return {
            count: dataSearch.length,
            results: dataSearch.slice(start, end),
          };
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  getAddProduct(input: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Observable<{
    count: number;
    results: Product[];
  }> {
    const start = (input.pageIndex - 1) * input.pageSize;
    const end = start + input.pageSize;

    return this.http
      .get<{ count: number; results: Product[] }>(
        'http://127.0.0.1:8080/api/products'
      )
      .pipe(
        map((data) => {
          const filterConditions = (d: Product) =>
            (d.propNameMain === '' || d.propValueMain === '') &&
            (d.propNameSub === '' || d.propValueSub === '');

          const dataSearch = input.search
            ? data.results.filter(
                (d) =>
                  (d.title || '')
                    .toLowerCase()
                    .includes(input.search.toLowerCase()) ||
                  (d.sku || '')
                    .toLowerCase()
                    .includes(input.search.toLowerCase())
              )
            : data.results.filter(filterConditions);

          const filteredResults = dataSearch.filter(filterConditions);

          return {
            count: filteredResults.length,
            results: filteredResults.slice(start, end),
          };
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  getUpdateProduct(input: {
    pageIndex: number;
    pageSize: number;
    search: string;
  }): Observable<{
    count: number;
    results: Product[];
  }> {
    const start = (input.pageIndex - 1) * input.pageSize;
    const end = start + input.pageSize;

    return this.http
      .get<{
        count: number;
        results: Product[];
      }>('http://127.0.0.1:8080/api/products')
      .pipe(
        map((data) => {
          const filterConditions = (d: Product) =>
            (d.propNameMain !== '' && d.propValueMain !== '') ||
            (d.propNameSub !== '' && d.propValueSub !== '');

          const dataSearch = input.search
            ? data.results.filter(
                (d) =>
                  (d.title || '')
                    .toLowerCase()
                    .includes(input.search.toLowerCase()) ||
                  (d.sku || '')
                    .toLowerCase()
                    .includes(input.search.toLowerCase())
              )
            : data.results.filter(filterConditions);

          const filteredResults = dataSearch.filter(filterConditions);

          return {
            count: filteredResults.length,
            results: filteredResults.slice(start, end),
          };
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  // searchMemberGroup(): Observable<{ results: Product[] }> {
  //   return this.http.get<{ results: Product[] }>(
  //     'http://127.0.0.1:8080/api/products'
  //   );
  // }

  searchMemberGroup(
    searchMember: string,
    productGroups: Group[]
  ): Observable<Group[]> {
    return this.http.get<Group[]>('http://127.0.0.1:8080/api/products').pipe(
      map((data) => {
        const updateGroups = productGroups.map((g) => {
          const filteredGroup = g.group.filter(
            (m) =>
              (m.title || '')
                .toLowerCase()
                .includes(searchMember.toLowerCase()) ||
              (m.sku || '').toLowerCase().includes(searchMember.toLowerCase())
          );
          return { ...g, group: filteredGroup };
        });
        return updateGroups;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateProperty(
    sku: string,
    propNameMain: string,
    propNameSub: string,
    propValueMain: string,
    propValueSub: string
  ): Observable<Product> {
    const updateData = {
      propNameMain: propNameMain,
      propNameSub: propNameSub,
      propValueMain: propValueMain,
      propValueSub: propValueSub,
    };

    return this.http.put<Product>(
      `http://127.0.0.1:8080/api/updateProduct/${sku}`,
      updateData
    );
  }

  cancelAllProperty(): Observable<void> {
    const updateData = {
      propNameMain: '',
      propNameSub: '',
      propValueMain: '',
      propValueSub: '',
    };

    return this.http.put<void>(
      'http://127.0.0.1:8080/api/cancelAllProperty',
      updateData
    );
  }

  cancelSingleProperty(sku: string): Observable<Product> {
    const updateData = {
      propNameMain: '',
      propNameSub: '',
      propValueMain: '',
      propValueSub: '',
    };

    return this.http.put<Product>(
      `http://127.0.0.1:8080/api/cancelSingleProperty/${sku}`,
      updateData
    );
  }
}
