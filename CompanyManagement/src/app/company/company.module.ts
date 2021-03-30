import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCompanyComponent } from './list-company/list-company.component';
import { DataTablesModule } from 'angular-datatables';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddBranchComponent } from './BranchManagement/add-branch/add-branch.component';
import { UpdateBranchComponent } from './BranchManagement/update-branch/update-branch.component';

@NgModule({
  declarations: [
    ListCompanyComponent,
    ViewCompanyComponent,
    UpdateCompanyComponent,
    AddCompanyComponent,
    AddBranchComponent,
    UpdateBranchComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
})
export class CompanyModule {}
