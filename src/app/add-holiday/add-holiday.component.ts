import {Component, OnInit} from '@angular/core';
import {HolidayService} from '../holiday.service';
import {ActivatedRoute} from '@angular/router';
import {HolidayType} from '../types';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent implements OnInit {

  employeeId: number;
  holidayRequest;
  startDate: Date;
  duration: number;
  holidayType: HolidayType;
  types;

  constructor(private holidayService: HolidayService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.employeeId = params['employeeId']);
    this.types = Object.keys(HolidayType);
  }

  submitForm() {
    this.holidayRequest = {
      startDate: this.startDate,
      duration: this.duration,
      holidayType: this.holidayType
    };
    this.holidayService.addHoliday(this.holidayRequest, this.employeeId);
  }

}
