import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ApiService} from '../shared/api.service';
import {EmployeeModel} from './employee-dashboard.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  // emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // numberRegEx = /\-?\d*\.?\d{1,2}/;

  constructor(private formbuilder: FormBuilder, 
    private api : ApiService) {}

    ngOnInit() : void {
      this.formValue = new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'email' : new FormControl(null, [Validators.required, Validators.email]),
        'contact' : new FormControl(null, 
          [ Validators.required,
            Validators.minLength(11),
            Validators.maxLength(15)
            
          ])
      }) 
       this.getAllEmployee();
    }
  get name() {
    return this.formValue.get('name');
  }

  get email() {
    return this.formValue.get('email');
  }
  get contact() {
    return this.formValue.get('contact');
  }
  // ngOnInit(): void {
  //   this.formValue = this.formbuilder.group({
  //     name : [''],
  //     email : [''],
  //     contact : [''],
  //   })
  //   this.getAllEmployee();
  // }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;

    if (this.formValue.value.name.length, this.formValue.value.email.length,
      this.formValue.value.contact.length == 0){
      alert('Please enter the required fields!');
      return;
    }
    // if (!this.emailPattern.test(String(this.formValue.value.email).toLowerCase())){
    //  alert('Please enter valid email address!')
    //  return;
    // }
    // if(this.formValue.value.contact === '' && this.numberRegEx) {
    //   alert('Please enter valid mobile number!')
    //   return;  
    // }

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    _err=>{
      alert("Please enter the required fields");
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=> {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contact'].setValue(row.contact);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.contact = this.formValue.value.contact;
   
    if (this.formValue.value.name, this.formValue.value.email,
      this.formValue.value.contact == 0){
      alert('Please enter the required fields!');
      return;
    }
    // if (!this.emailPattern.test(String(this.formValue.value.email).toLowerCase())){
    //  alert('Please enter valid email address!')
    //  return;
    // }
    // if(this.formValue.value.contact === '' && this.numberRegEx) {
    //   alert('Please enter valid mobile number!')
    //   return;  
    // }
    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
  viewList(row: any){
    this.api.setUser(row)
}
}