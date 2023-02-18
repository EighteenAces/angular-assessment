import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  } from '@angular/forms';
import { ApiService } from './shared/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angular-assessment-jellie-mae-ortiz';
  FormModelObj: any;
  formValue !: FormGroup;
  contactData !: any;

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }
  
  postInfoCreated() {
    this.FormModelObj.name = this.formValue.value.name;
    this.FormModelObj.email = this.formValue.value.email;
    this.FormModelObj.contact = this.formValue.value.contact;

    this.api.postEmployee(this.FormModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllInfo();
    },
    err=> {
      alert("Something went wrong!")
    })
  }
  getAllInfo(){
    this.api.getEmployee()
    .subscribe(res=>{
    this.contactData = res;
    })
  }

  updateInfo(){
    this.FormModelObj.name = this.formValue.value.name;
    this.FormModelObj.email = this.formValue.value.email;
    this.FormModelObj.contact = this.formValue.value.contact;
    
    this.api.updateEmployee(this.FormModelObj, this.FormModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllInfo();
    })
  }
}
