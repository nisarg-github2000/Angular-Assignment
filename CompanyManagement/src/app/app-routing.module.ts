import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCompanyComponent } from './company/list-company/list-company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';

const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: ListCompanyComponent },
  { path: 'company/add', component: AddCompanyComponent },
  { path: 'company/view/:id', component: ViewCompanyComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
