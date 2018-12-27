import {Component, OnInit} from '@angular/core';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';
import {Employee, Indicators} from '../../../types';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EmployeeService} from '../../../services/employee.service';
import {TaskService} from '../../../services/task.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

  employees: Array<Employee>;
  indicators: Indicators;
  areIndicatorsLoaded = false;
  tasksEmployee = [];
  tasksEverybody = [];
  tasksEmployeeOnTime = [];
  tasksEverybodyOnTime = [];
  suggestionsEmployee = [];
  suggestionsEverybody = [];
  meanTimesEmployee = [];
  meanTimesEverybody = [];
  light = '#E3F2FD';
  normal = '#BBDEFB';
  dark = '#90CAF9';

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
              private employeeService: EmployeeService, private taskService: TaskService) {
  }

  ngOnInit() {
    this.fetchIndicators();
  }

  fetchIndicators() {
    this.taskService.fetchIndicators(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.indicators = res;
        this.route.params.subscribe(
          params => {
            this.tasksEmployee = new Chart('tasksEmployee', {
              type: 'bar',
              data: {
                labels: ['To do', 'Doing', 'Done'],
                datasets: [
                  {
                    data: [this.indicators.numberTasksEmployeeToDo,
                      this.indicators.numberTasksEmployeeDoing,
                      this.indicators.numberTasksEmployeeDone],
                    backgroundColor: [this.light, this.normal, this.dark]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Employee\'s tasks'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                      callback: function (value) {
                        if (value % 1 === 0) {
                          return value;
                        }
                      }
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      display: false
                    }
                  }]
                }
              },
            });
            this.tasksEverybody = new Chart('tasksEverybody', {
              type: 'bar',
              data: {
                labels: ['To do', 'Doing', 'Done'],
                datasets: [
                  {
                    data: [this.indicators.numberTasksEverybodyToDo,
                      this.indicators.numberTasksEverybodyDoing,
                      this.indicators.numberTasksEverybodyDone],
                    backgroundColor: [this.light, this.normal, this.dark]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'All tasks'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                      callback: function (value) {
                        if (value % 1 === 0) {
                          return value;
                        }
                      }
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      display: false
                    }
                  }]
                }
              }
            });
            this.tasksEmployeeOnTime = new Chart('tasksEmployeeOnTime', {
              type: 'doughnut',
              data: {
                labels: ['Before deadline', 'After deadline'],
                datasets: [
                  {
                    data: [this.indicators.numberTasksEmployeeDoneBeforeDeadline,
                      this.indicators.numberTasksEmployeeDone - this.indicators.numberTasksEmployeeDoneBeforeDeadline],
                    backgroundColor: [this.light, this.normal]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Employee\'s tasks on time'
                },
                rotation: Math.PI,
                circumference: Math.PI
              }
            });
            this.tasksEverybodyOnTime = new Chart('tasksEverybodyOnTime', {
              type: 'doughnut',
              data: {
                labels: ['Before deadline', 'After deadline'],
                datasets: [
                  {
                    data: [this.indicators.numberTasksEverybodyDoneBeforeDeadline,
                      this.indicators.numberTasksEverybodyDone - this.indicators.numberTasksEverybodyDoneBeforeDeadline],
                    backgroundColor: [this.light, this.normal]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'All tasks on time'
                },
                rotation: Math.PI,
                circumference: Math.PI
              }
            });
            this.suggestionsEmployee = new Chart('suggestionsEmployee', {
              type: 'bar',
              data: {
                labels: ['Reported', 'In implementation', 'Implemented'],
                datasets: [
                  {
                    data: [this.indicators.numberSuggestionsEmployeeReported,
                      this.indicators.numberSuggestionsEmployeeInImplementation,
                      this.indicators.numberSuggestionsEmployeeImplemented],
                    backgroundColor: [this.light, this.normal, this.dark]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Employee\'s suggestions'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                      callback: function (value) {
                        if (value % 1 === 0) {
                          return value;
                        }
                      }
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      display: false
                    }
                  }]
                }
              }
            });
            this.suggestionsEverybody = new Chart('suggestionsEverybody', {
              type: 'bar',
              data: {
                labels: ['Reported', 'In implementation', 'Implemented'],
                datasets: [
                  {
                    data: [this.indicators.numberSuggestionsEverybodyReported,
                      this.indicators.numberSuggestionsEverybodyInImplementation,
                      this.indicators.numberSuggestionsEverybodyImplemented],
                    backgroundColor: [this.light, this.normal, this.dark]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'All suggestions'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0,
                      callback: function (value) {
                        if (value % 1 === 0) {
                          return value;
                        }
                      }
                    }
                  }],
                  xAxes: [{
                    ticks: {
                      display: false
                    }
                  }]
                }
              }
            });
            this.meanTimesEmployee = new Chart('meanTimesEmployee', {
              type: 'bar',
              data: {
                labels: ['Tasks', 'Notif. 1', 'Notif. 2'],
                datasets: [
                  {
                    data: [this.indicators.averageTimeTasksEmployeeBetweenDeadlineAndEndTime,
                      this.indicators.averageTimeNotificationsEmployeeBetweenStartTimeAndCreationTime,
                      this.indicators.averageTimeNotificationsEmployeeBetweenEndTimeAndStartTime],
                    backgroundColor: [this.light, this.normal, this.dark]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'Employee\'s mean times between:'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      display: false
                    }
                  }],
                }
              }
            });
            this.meanTimesEverybody = new Chart('meanTimesEverybody', {
              type: 'bar',
              data: {
                labels: ['Tasks', 'Notif. 1', 'Notif. 2'],
                datasets: [
                  {
                    data: [this.indicators.averageTimeTasksEverybodyBetweenDeadlineAndEndTime,
                      this.indicators.averageTimeNotificationsEverybodyBetweenStartTimeAndCreationTime,
                      this.indicators.averageTimeNotificationsEverybodyBetweenEndTimeAndStartTime],
                    backgroundColor: [this.light, this.normal, this.dark]
                  }
                ]
              },
              options: {
                legend: {
                  display: false
                },
                title: {
                  display: true,
                  text: 'All mean times between:'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      display: false
                    }
                  }],
                }
              }
            });
          }
        );
      }, err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        } else {
          this.showError(err);
        }
      }, () => {
        this.areIndicatorsLoaded = true;
      });
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
