import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ViewcontactComponent } from './users/view-contact/view-contact.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';


const routes: Routes = [
  { path: '', component: EmployeeDashboardComponent},
  { path: 'view', component: ViewcontactComponent},
  { path: 'back', component: ViewcontactComponent},
  { path: '**', pathMatch: 'full', component: NotfoundpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
