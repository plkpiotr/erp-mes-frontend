import { Component, OnInit } from '@angular/core';
import {Employee, Phase, Suggestion} from '../types';
import {SuggestionService} from '../suggestion.service';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrls: ['./add-suggestion.component.css']
})
export class AddSuggestionComponent implements OnInit {

  suggestionRequest;
  phase: Phase;
  name: string;
  description: string;
  authorId?: number;
  recipientIds: number[];

  // author: Employee; // TODO: Get logged in user (optional)
  recipients: Array<Employee>;
  phases;

  constructor(private suggestionService: SuggestionService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.fetchAllEmployees().subscribe(res => this.recipients = res);
    this.phases = Object.keys(Phase);
  }

  submitForm() {
    this.suggestionRequest = {
      phase: this.phase,
      name: this.name,
      description: this.description,
      authorId: null, // TODO: Get logged in user (optional)
      recipientIds: this.recipientIds
    };
    let suggestion: Suggestion;
    this.suggestionService.addSuggestion(this.suggestionRequest)
      .subscribe(res => {
          suggestion = res;
        }, err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/suggestions', suggestion.id]);
        });
  }
}
