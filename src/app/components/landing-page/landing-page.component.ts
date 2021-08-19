import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomFormControl } from 'src/app/models/custom-form-control';
import { ControlService } from 'src/app/services/controls.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  controlGroups: CustomFormControl[][] = [];
  subscription!: Subscription;
  bannerIcon: string = 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/fill_form_re_cwyf.svg';

  constructor(
    private cService: ControlService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.subscription = this.cService.getControls().subscribe(
      group => this.controlGroups = group,
      error => console.log(error.message)
    ).add(() => this.spinnerService.hideSpinner());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any): void {
    console.log(data);
  }
}
