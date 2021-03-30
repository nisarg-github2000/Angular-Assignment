import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyModel } from 'src/app/models/company-model';
import { CompanyManagementService } from 'src/app/services/CompanyManagement/company-management.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css'],
})
export class ViewCompanyComponent implements OnInit {
  companyId: number;
  company: CompanyModel = new CompanyModel();

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyManagementService
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params.id;
    this.companyService
      .getCompanyById(this.companyId)
      .subscribe((resp: CompanyModel) => {
        this.company = resp;
      });
  }
}
