import {Component, OnInit, ViewChild} from '@angular/core';
import {Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  suggestions: Array<Suggestion>;
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

  constructor(private suggestionService: SuggestionService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.suggestionService.fetchAllSuggestions().subscribe(res => {
      this.suggestions = res;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
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

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
  }
}
