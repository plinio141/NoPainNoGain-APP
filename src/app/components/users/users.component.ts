import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CitiesService, OfficesService, ClientsService } from './../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  searchClientsForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  cities = [];
  offices = [];
  clients = [];
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientsService,
    private citiesService: CitiesService,
    private officesService: OfficesService
  ) {}

  ngOnInit(){
    this.searchClientsForm = this.formBuilder.group({
      city: ['', Validators.required],
      office: ['', Validators.required],
    });
    this.getCities();
  }

  // convenience getter for easy access to form fields
  get f(){
    return this.searchClientsForm.controls;
  }

  getCities() {
    this.citiesService.findAll()
      .pipe(first())
      .subscribe(
        data => {
          if(!data.success){
            this.error = data.message;
            this.loading = false;
          }else{
            this.cities = data.cities;
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        }
      )
  }

  getAllOffices(){
    this.officesService.findAll(this.f.city.value)
      .pipe(first())
      .subscribe(
        data => {
          if(!data.success){
            this.error = data.message;
            this.loading = false;
          }else{
            this.offices = data.offices;
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        }
      )
  }

  // on submit
  onSubmit(){
    this.submitted = true;

    // stop if form is invalid
    if(this.searchClientsForm.invalid){
      return;
    }

    this.loading = true;

    this.clientService.search(this.f.city.value, this.f.office.value)
      .pipe(first())
      .subscribe(
        data => {
          if(!data.success){
            this.error = data.message;
            this.success = false;
          }else{
            this.success = true;
            this.clients = data.clients;
          }
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      )
  }
}
