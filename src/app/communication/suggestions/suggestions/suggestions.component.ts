import {Component, OnInit} from '@angular/core';
import {Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  suggestions: Array<Suggestion>;
  areSuggestionsLoaded = false;

  constructor(private suggestionService: SuggestionService, private router: Router) { }

  ngOnInit() {
    this.suggestionService.fetchAllSuggestions().subscribe(res => {
      this.suggestions = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areSuggestionsLoaded = true;
    });
  }

  seeSuggestion(id: number) {
    this.router.navigate(['/suggestions', id]);
  }

  addSuggestion() {
    this.router.navigate(['/suggestions/add']);
  }
}
