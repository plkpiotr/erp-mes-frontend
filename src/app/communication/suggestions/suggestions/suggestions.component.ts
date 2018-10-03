import {Component, OnInit, ViewChild} from '@angular/core';
import {Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  suggestions: Array<Suggestion>;
  mySuggestions: Array<Suggestion>;
  areSuggestionsLoaded = false;
  displayedColumns: string[] = ['creationTime', 'phase', 'id', 'name', 'author'];
  dataSource: MatTableDataSource<Suggestion> = new MatTableDataSource<Suggestion>();
  paginator: any;
  sort: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort)
  set sorting(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  constructor(private suggestionService: SuggestionService, private router: Router) { }

  ngOnInit() {
    this.suggestionService.fetchAllSuggestions().subscribe(res => {
      this.suggestions = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areSuggestionsLoaded = true;
      this.dataSource = new MatTableDataSource<Suggestion>(this.suggestions);
    });
  }

  seeSuggestion(id: number) {
    this.router.navigate(['/suggestions', id]);
  }

  addSuggestion() {
    this.router.navigate(['/suggestions/add']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
