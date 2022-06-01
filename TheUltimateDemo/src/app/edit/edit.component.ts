import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address, Person, SearchService } from '../shared';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  person: Person;
  editName: string;
  editPhone: string;
  editAddress: Address;

  sub: Subscription;

  constructor(private service: SearchService,
              private router: Router,
              private route: ActivatedRoute) { 
              }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        const id = +params.id; // string to int
        this.service.get(id).subscribe(person => {
          if (person) {
            this.editName = person.name;
            this.editPhone = person.phone;
            this.editAddress = person.address;
            this.person = person;
          } else {
            this.gotoList();
          }
        });
      });
    }
  
    ngOnDestroy(): void {
      if (this.sub) {
        this.sub.unsubscribe();
      }
    }
  
    cancel() {
      this.router.navigate(['/search']);
    }
  
    save() {
      this.person.name = this.editName;
      this.person.phone = this.editPhone;
      this.person.address = this.editAddress;
      this.service.save(this.person);
      this.gotoList();
    }
  
    gotoList() {
      if (this.person) {
        this.router.navigate(['/search', {term: this.person.name} ]);
      } else {
        this.router.navigate(['/search']);
      }
    }
  }