import {Component, OnInit} from '@angular/core';
import {Phase, Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  suggestion: Suggestion;
  isSuggestionLoaded = false;
  isImplemented;

  constructor(private suggestionService: SuggestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.fetchOneSuggestion();
    this.isImplemented = Phase.IMPLEMENTED;
  }

  fetchOneSuggestion() {
    this.suggestionService.fetchOneSuggestion(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.suggestion = res;
      }, err => {
        console.log(err);
      }, () => {
        this.isSuggestionLoaded = true;
      });
  }

  submitForm() {
    this.suggestionService.setNextPhase(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.suggestion = res;
      }, err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/suggestions']);
      });
  }

  seeEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }
}
