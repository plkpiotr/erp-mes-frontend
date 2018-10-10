import {Component, OnInit} from '@angular/core';
import {Employee, Role} from '../../../types';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeRequest;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  role: FormControl;
  accountNumber: FormControl;
  daysOffPerYear: FormControl;
  salary: FormControl;
  roles;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.roles = Object.keys(Role);
    this.setupFormControls();
    this.form = new FormGroup({
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "role": this.role,
      "accountNumber": this.accountNumber,
      "daysOffPerYear": this.daysOffPerYear,
      "salary": this.salary
    });
  }

  setupFormControls() {
    this.firstName = new FormControl('', [
      Validators.required
    ]);
    this.lastName = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.role = new FormControl('', [
      Validators.required
    ]);
    this.accountNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(26),
      Validators.maxLength(26),
      Validators.pattern("^[0-9]*$"),
    ]);
    this.daysOffPerYear = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.min(0),
      Validators.max(26)
    ]);
    this.salary = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
  }

  submitForm() {
    this.employeeRequest = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      role: this.form.get('role').value,
      contractRequest: {
        accountNumber: this.form.get('accountNumber').value,
        daysOffPerYear: this.form.get('daysOffPerYear').value,
        salary: this.form.get('salary').value
      }
    };
    let employee: Employee;
    this.employeeService.addEmployee(this.employeeRequest)
      .subscribe(res => {
          employee = res;
        },
        err => {
          this.showError(err);
        },
        () => {
          this.router.navigate(['/employees', employee.id]);
        });
  }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  showError(err) {
    this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });
  }
}
