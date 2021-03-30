import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyManagementService } from 'src/app/services/CompanyManagement/company-management.service';
import { CompanyModel } from '../../models/company-model';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css'],
})
export class UpdateCompanyComponent implements OnInit {
  company: CompanyModel;
  updateForm: FormGroup;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) data: CompanyModel,
    private companyService: CompanyManagementService,
    private toastr: ToastrService
  ) {
    this.company = data;
    this.updateForm = this.builder.group({
      name: [this.company.name, Validators.required],
      email: [this.company.email, [Validators.required, Validators.email]],
      address: [this.company.address, Validators.required],
      totalEmployee: [
        this.company.totalEmployee,
        [Validators.required, Validators.min(0)],
      ],
      totalBranch: [this.company.totalBranch || 0, [Validators.min(0)]],
      isCompanyActive: [
        this.company.isCompanyActive || true,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.valid) {
      let data = JSON.parse(JSON.stringify(this.updateForm.value));
      data.id = this.company.id;
      data.companyBranch = this.company.companyBranch;
      this.companyService.updateCompany(data).subscribe((resp: any) => {
        if (resp) {
          this.toastr.success('Company Updated Successfully', 'Success!');
          this.dialogRef.close({ success: true });
        } else {
          this.toastr.error('Operation Failed!', 'Failed!');
          this.closeDialog();
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close({ success: false });
  }
}
