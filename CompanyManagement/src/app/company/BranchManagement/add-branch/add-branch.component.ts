import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { BrachDetails, CompanyModel } from 'src/app/models/company-model';
import { AlertService } from 'src/app/services/AlertService/alert.service';
import { CompanyManagementService } from 'src/app/services/CompanyManagement/company-management.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
})
export class AddBranchComponent implements OnInit {
  branchesForm: FormGroup;
  branchSubmitted = false;
  branches: BrachDetails[] = [];
  company: CompanyModel;
  branchId: number;

  constructor(
    private builder: FormBuilder,
    private alertService: AlertService,
    private companyService: CompanyManagementService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddBranchComponent>,
    @Inject(MAT_DIALOG_DATA) data: CompanyModel
  ) {
    this.branchesForm = this.builder.group({
      branchId: ['', Validators.required],
      branchName: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.company = data;
  }

  ngOnInit(): void {
    this.branchId = 0;
    this.company.companyBranch.map((ele) => {
      let id = parseInt(ele.branchId);
      if (id > this.branchId) {
        this.branchId = id;
      }
    });
    this.branchId += 1;

    this.branchesForm.patchValue({ branchId: this.branchId });
  }

  get branchesControl() {
    return this.branchesForm.controls;
  }

  onBranchSubmit() {
    this.branchSubmitted = true;
    if (this.branchesForm.valid) {
      let data = JSON.parse(JSON.stringify(this.branchesForm.value));
      console.log(data);
      this.company.companyBranch.push(data);
      this.company.totalBranch = this.company.companyBranch.length;
      this.companyService.updateCompany(this.company).subscribe((resp: any) => {
        if (resp) {
          this.toastr.success('Branch added successfully', 'Success!');
          this.dialogRef.close({ success: true });
        } else {
          this.toastr.error('Operation Failed', 'Failed!');
          this.closeDialog();
        }
      });
      this.branchesForm.reset();
    }
  }

  closeDialog() {
    this.dialogRef.close({ success: false });
  }
}
