import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-configuration',
  templateUrl: './app-configuration.component.html',
  styleUrls: ['./app-configuration.component.css']
})
export class AppConfigurationComponent implements OnInit {
  configurationForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {     
  }

  // convenience getter for easy access to form fields
  get f() { return this.configurationForm.controls; }

  onSubmit(){
    this.submitted = true;

    if(this.configurationForm.invalid){      
      alert('User form is not valid!!');
      return;
    } else {
      //alert('User form is valid!!')
      this.http.post('http://34.69.178.80:8080/Application/AddApplication', this.configurationForm.value)
      .subscribe((response)=>{
        console.log('repsonse ',response);
        this.success = true;
      })
    }
    
  }

  ngOnInit() {
    this.configurationForm = this.formBuilder.group({
      applicationName: ['', Validators.required],
      applicationURL: ['', Validators.required],
      platform: ['Desktop', Validators.required]
    })
  }

  firstClick(){
    console.log('clicked');
  }
}
