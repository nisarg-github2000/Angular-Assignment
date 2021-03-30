import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CompanyManagementService } from '../../services/CompanyManagement/company-management.service';
import { BrachDetails, CompanyModel } from '../../models/company-model';
import { UpdateCompanyComponent } from '../update-company/update-company.component';
import { AlertService } from '../../services/AlertService/alert.service';
import { AddBranchComponent } from '../BranchManagement/add-branch/add-branch.component';
import { UpdateBranchComponent } from '../BranchManagement/update-branch/update-branch.component';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css'],
})
export class ListCompanyComponent implements OnInit, OnDestroy {
  title = 'List of Companies';
  companyList: CompanyModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private companyService: CompanyManagementService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    // };
    this.fetchData();
  }
  fetchData() {
    this.companyService.getAllCompanies().subscribe((list) => {
      this.companyList = list;
      console.log(this.companyList);

      // this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

  viewCompany(id: string) {
    this.router.navigate([`/company/view/${id}`]);
  }

  addBranch(company: CompanyModel) {
    let dialog = this.dialog.open(AddBranchComponent, {
      data: company,
      width: '40%',
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result.success) {
        this.fetchData();
      }
    });
  }

  updateCompany(company: CompanyModel) {
    let dialog = this.dialog.open(UpdateCompanyComponent, {
      width: '40%',
      data: company,
    });

    dialog.afterClosed().subscribe((resp: any) => {
      if (resp.success) {
        this.fetchData();
      }
    });
  }

  updateBranch(company: CompanyModel, branch: BrachDetails) {
    let dialog = this.dialog.open(UpdateBranchComponent, {
      width: '40%',
      data: { company, branch },
    });
    dialog.afterClosed().subscribe((resp: any) => {
      if (resp.success) {
        this.fetchData();
      }
    });
  }

  deleteBranch(company: CompanyModel, branch: BrachDetails) {
    this.alertService
      .confirmationAlert(
        'Delete Branch?',
        'Do you really want to delete branch?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          console.log(company);
          let index = company.companyBranch.indexOf(branch);
          company.companyBranch.splice(index, 1);
          company.totalBranch -= 1;
          delete company.branchesVisible;
          this.companyService.updateCompany(company).subscribe((resp: any) => {
            if (resp) {
              this.fetchData();
              this.alertService.successAlert(
                'Deleted!',
                'Branch deleted successfully'
              );
            } else {
              this.alertService.failureAlert(
                'Failed!',
                'Delete operation has failed'
              );
            }
          });
        }
      });
  }

  deleteCompany(id: number) {
    this.alertService
      .confirmationAlert(
        'Delete Company?',
        'Do you really want to delete company?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.companyService.deleteCompany(id).subscribe((resp: any) => {
            console.log(resp);
            if (resp) {
              this.alertService.successAlert(
                'Deleted Successful!',
                'Company is deleted!'
              );
            } else {
              this.alertService.failureAlert(
                'Failed!',
                'Delete operation failed'
              );
            }
          });
        }
      });
  }
}
