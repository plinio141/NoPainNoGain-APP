import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CitiesService, OfficesService } from './../../services';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  cities = [];
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private citiesService: CitiesService,
    private officesService: OfficesService
  ) {}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.getCities();
  }

  // convenience getter for easy access to form fields
  get f(){
    return this.registerForm.controls;
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

  // on submit
  onSubmit(){
    this.submitted = true;

    // stop if form is invalid
    if(this.registerForm.invalid){
      return;
    }

    this.loading = true;

    this.officesService.register(this.f.city.value, this.f.code.value, this.f.name.value)
      .pipe(first())
      .subscribe(
        data => {
          if(!data.success){
            this.error = data.message;
            this.success = false;
          }else{
            this.success = true;
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
