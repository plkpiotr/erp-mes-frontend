import {Component, OnInit} from '@angular/core';
import {Employee, Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrls: ['./add-suggestion.component.scss']
})
export class AddSuggestionComponent implements OnInit {

  suggestionRequest;
  form: FormGroup;

  name: FormControl;
  description: FormControl;
  recipientIds: FormControl;

  recipients: Array<Employee>;
  areRecipientsLoaded = false;

  constructor(private suggestionService: SuggestionService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.fetchColleagues().subscribe(res => {
      this.recipients = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areRecipientsLoaded = true;
    });
    this.setupFormControls();
    this.form = new FormGroup({
      'name': this.name,
      'description': this.description,
      'recipientIds': this.recipientIds
    });
  }

  setupFormControls() {
    this.name = new FormControl('', [
      Validators.maxLength(25),
      Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.maxLength(250),
      Validators.required
    ]);
    this.recipientIds = new FormControl('', [
      Validators.required
    ]);
  }

  submitForm() {
    this.suggestionRequest = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      recipientIds: this.form.get('recipientIds').value
    };
    let suggestion: Suggestion;
    this.suggestionService.addSuggestion(this.suggestionRequest)
      .subscribe(res => {
          suggestion = res;
        }, err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/suggestions/', suggestion.id]);
        });
  }

  getErrorName() {
    return this.name.hasError('maxLength') ? '' : '0-25 characters';
  }

  getErrorDescription() {
    return this.description.hasError('maxLength') ? '' : '0-250 characters';
  }
}
