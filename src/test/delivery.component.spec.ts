import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryComponent } from '../app/delivery/delivery.component';
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {TaskComponent} from "../app/task/task.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TeamComponent} from "../app/team/team.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {ActivatedRoute} from "@angular/router";

const mockDelivery = {
  "id": 1,
  "deliveryItems": [
    {
      "id": 1,
      "item": {
        "id": 1,
        "name": 'przedmiot1',
        "quantity": 10,
        "stockPrice": 10,
        "originalPrice": 20,
        "currentPrice": 20
      },
      "quantity": 10
    },
    {
      "id": 2,
      "item": {
        "id": 2,
        "name": 'przedmiot2',
        "quantity": 5,
        "stockPrice": 10,
        "originalPrice": 20,
        "currentPrice": 20
      },
      "quantity": 5
    }
  ],
  "scheduledFor": new Date('2018-08-15'),
  "value": 150
};

describe('DeliveryComponent', () => {
  let component: DeliveryComponent;
  let fixture: ComponentFixture<DeliveryComponent>;
  let service: DeliveryService;
  let itemService: ItemService;
  let reportService: ReportService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        AddEmployeeComponent,
        AddHolidayComponent,
        AddTaskComponent,
        AddDeliveryComponent,
        AddItemComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamComponent,
        TeamsComponent,
        TasksComponent,
        TaskComponent,
        CurrentReportComponent,
        ReportComponent,
        ReportsComponent,
        ItemsComponent,
        ItemComponent,
        DeliveryComponent,
        DeliveriesComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService,
        ItemService,
        DeliveryService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DeliveryService);
    itemService = TestBed.get(ItemService);
    reportService = TestBed.get(ReportService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deliveryService.fetchOneDelivery()', () => {
    spyOn(component, 'fetchDelivery').and.callThrough();
    spyOn(service, 'fetchOneDelivery').and.callThrough();
    component.ngOnInit();
    expect(component.fetchDelivery).toHaveBeenCalled();
    expect(service.fetchOneDelivery).toHaveBeenCalledWith(route.snapshot.params['id']);
  });

  describe('when "Potwierdź" button is clicked', () => {
    beforeEach(() => {
      spyOn(itemService, 'supplyItem').and.callThrough();
      spyOn(reportService, 'addExpense').and.callThrough();
      component.ngOnInit();
      component.delivery = mockDelivery;
      component.confirmDelivery();
    });

    it('should call itemService.supplyItem', () => {
      expect(itemService.supplyItem).toHaveBeenCalled();
    });

    it('should call reportService.addExpense', () => {
      expect(reportService.addExpense).toHaveBeenCalled();
    });
  });
});
