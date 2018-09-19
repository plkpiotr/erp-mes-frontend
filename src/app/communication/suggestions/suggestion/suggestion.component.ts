import {Component, OnInit} from '@angular/core';
import {Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  suggestion: Suggestion;
  isSuggestionLoaded = false;

  constructor(private suggestionService: SuggestionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchSuggestion();
  }

  fetchSuggestion() {
    this.suggestionService.fetchOneSuggestion(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.suggestion = res;
      }, err => {
        console.log(err);
      }, () => {
        this.isSuggestionLoaded = true;
      });
  }
}
