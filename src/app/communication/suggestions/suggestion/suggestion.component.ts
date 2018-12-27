import {Component, OnInit} from '@angular/core';
import {Suggestion} from '../../../types';
import {SuggestionService} from '../../../services/suggestion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import {Phase} from "../../../globals";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  suggestion: Suggestion;
  isSuggestionLoaded = false;
  isImplemented = Phase.IMPLEMENTED;

  constructor(private suggestionService: SuggestionService, private route: ActivatedRoute,
              private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.fetchSuggestion();
      }
    );
  }

  fetchSuggestion() {
    this.suggestionService.fetchOneSuggestion(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.suggestion = res;
      }, err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        } else {
          this.showError(err, true);
        }
      }, () => {
        this.isSuggestionLoaded = true;
      });
  }

  submitForm() {
    this.suggestionService.setNextPhase(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.suggestion = res;
      }, err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        } else {
          this.showError(err, false);
        }
      }, () => {
        this.router.navigate(['/suggestions', this.route.snapshot.params[('id')]]);
      });
  }

  seeEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/suggestions']));
    }
  }
}
