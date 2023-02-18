// import { ViewCompileResult } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewcontactComponent implements OnInit {

  userId: string ='';
  contactData : any;

  constructor(private api : ApiService, private activatedRouter: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.userId = data['id'];
    })
   this.contactData = this.api.getUser();
  console.log(this.api.getUser());
  }

}
