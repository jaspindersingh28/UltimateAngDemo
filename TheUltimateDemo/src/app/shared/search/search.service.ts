import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(q: string): Observable<any> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().pipe(
      map((data: any) => data
        .filter(item => JSON.stringify(item).toLowerCase().includes(q)))
    );
  }

  getAll(){
    return this.http.get('assets/data/people.json');
  }

  get(id: number) {
    return this.getAll().pipe(map((all: any) => {
      if (localStorage['person' + id]) {
        return JSON.parse(localStorage['person' + id]);
      }
      return all.find(e => e.id === id);
    }));
  }
  
  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}
  

export class Address {
  street: string;
  city: string;
  province: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj && obj.street || null;
    this.city = obj && obj.city || null;
    this.province = obj && obj.province || null;
    this.zip = obj && obj.zip || null;
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || null;
    this.phone = obj && obj.phone || null;
    this.address = obj && obj.address || null;
  }
}