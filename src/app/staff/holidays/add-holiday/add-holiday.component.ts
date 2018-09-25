import {Component, OnInit} from '@angular/core';
import {HolidayService} from '../../../services/holiday.service';
import {ActivatedRoute} from '@angular/router';
import {HolidayType} from '../../../types';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit {

  employeeId: number;
  holidayRequest;
  form: FormGroup;
  startDate: FormControl;
  duration: FormControl;
  holidayType: FormControl;
  types;

  constructor(private holidayService: HolidayService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.employeeId = params['employeeId']);
    this.types = Object.keys(HolidayType);
    this.setupFormControls();
    this.form = new FormGroup({
      "startDate": this.startDate,
      "duration": this.duration,
      "holidayType": this.holidayType
    });
  }

  setupFormControls() {
    this.startDate = new FormControl('', [
      Validators.required
    ]);
    this.duration = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.holidayType = new FormControl('', [
      Validators.required
    ]);
  }

  submitForm() {
    this.holidayRequest = {
      startDate: this.form.get('startDate').value,
      duration: this.form.get('duration').value,
      holidayType: this.form.get('holidayType').value
    };
    this.holidayService.addHoliday(this.holidayRequest, this.employeeId);
  }

  getErrorMessage() {
    return this.duration.hasError('pattern') ? 'Enter a number' : '';
  }
}
