import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CitiesService } from './../../services';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cityForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  error = '';
  cities = [];
  offices = [];
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private citiesService: CitiesService
  ) {}

  ngOnInit(){
    this.cityForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f(){
    return this.cityForm.controls;
  }

  // on submit
  onSubmit(){
    this.submitted = true;

    // stop if form is invalid
    if(this.cityForm.invalid){
      return;
    }

    this.loading = true;

    this.citiesService.register(this.f.code.value, this.f.name.value)
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
