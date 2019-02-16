# <a name="0">ERP-MES (Front-end)</a>

- [Overview](#1)
- [Front-end technologies](#2)
- [Project structure](#3)
- [ERP features](#4)
  - [One of them](#4.1)
- [MES features](#5)
  - [Key Performance Indicators](#5.1)
  - [Instant Messenger](#5.2)
  - [Kaizen Teian](#5.3)
  - [Kanban Board](#5.4)
  - [Task scheduling algorithm](#5.5)
- [Quick start guide](#6)
- [Back-end repository](#7)
- [Heroku platform](#8)


## <a name="1">Overview</a> [&#8250;&#8250;&#8250;](#0)

Front-end layer of RESTful web service created as engineering thesis by [@patsaf](https://github.com/patsaf) and [@plkpiotr](https://github.com/plkpiotr).

ERP-MES is intended for management of a forwarding company.

The application was equipped with functionalities typical of Enterprise Resource Planning and Manufacturing Execution System.

## <a name="2">Front-end technologies</a> [&#8250;&#8250;&#8250;](#0)

- Angular 6
- HTML5 (Angular Material)
- CSS3 (Sass)
- JavaScript (jQuery, SockJS, STOMP, Chart.js)
- Heroku

## <a name="3">ERP features</a> [&#8250;&#8250;&#8250;](#0)

### <a name="3.1">One of them</a> [&#8250;](#3)

[one of them]

## <a name="4">MES features</a> [&#8250;&#8250;&#8250;](#0)

### <a name="4.1">Key Performance Indicators</a> [&#8250;](#4)

Evaluation of the work-in-progress expressed in mean times, number of tasks and suggestions by category - for one employee and the whole team: ![kpi](https://user-images.githubusercontent.com/21959354/52904777-f7e04580-3230-11e9-85f4-cde2b4736bb7.png)

### <a name="4.2">Instant Messenger</a> [&#8250;](#4)

Providing communication between employees in real time and documenting time and author's initials: ![chat](https://user-images.githubusercontent.com/21959354/52904775-f747af00-3230-11e9-9019-f2dc7d7730cf.png)

### <a name="4.3">Kaizen Teian</a> [&#8250;](#4)

Employee suggestion system with possibility of searching records:![suggestions](https://user-images.githubusercontent.com/21959354/52904778-f7e04580-3230-11e9-8096-c36101a698ff.png)

### <a name="4.4">Kanban Board</a> [&#8250;](#4)

Visualization of tasks created in the last four weeks for on person: ![kanban](https://user-images.githubusercontent.com/21959354/52904776-f7e04580-3230-11e9-9d3d-affa11a61646.PNG)

### <a name="4.5">Task scheduling algorithm</a> [&#8250;](#4)

Planning and reduction of total time allowed for tasks through scheduling algorithm: ![task](https://user-images.githubusercontent.com/21959354/52904779-f7e04580-3230-11e9-8328-4e4e3657c149.png)

## <a name="5">Project structure</a> [&#8250;&#8250;&#8250;](#0)

```
├───e2e
│   └───src
└───src
    ├───app
    │   ├───communication
    │   │   ├───emails
    │   │   │   ├───add-email
    │   │   │   ├───conversation
    │   │   │   ├───inbox
    │   │   │   ├───outbox
    │   │   │   └───reply-dialog
    │   │   ├───notifications
    │   │   │   ├───add-notification
    │   │   │   ├───notification
    │   │   │   └───notifications
    │   │   └───suggestions
    │   │       ├───add-suggestion
    │   │       ├───suggestion
    │   │       └───suggestions
    │   ├───custom
    │   │   └───error-dialog
    │   ├───pipes
    │   ├───production
    │   │   ├───finance
    │   │   │   ├───add-expense-dialog
    │   │   │   ├───add-income-dialog
    │   │   │   ├───current-report
    │   │   │   ├───recalculate-dialog
    │   │   │   ├───report
    │   │   │   └───reports
    │   │   ├───planning
    │   │   │   ├───planning
    │   │   │   ├───show-special-plan-dialog
    │   │   │   ├───special-plan-dialog
    │   │   │   ├───special-plan-no-date-dialog
    │   │   │   ├───special-plans
    │   │   │   └───update-daily-plan
    │   │   └───tasks
    │   │       ├───add-task
    │   │       ├───assignment
    │   │       ├───indicators
    │   │       ├───kanban
    │   │       ├───task
    │   │       └───tasks
    │   ├───security
    │   │   ├───login
    │   │   └───validate
    │   ├───services
    │   ├───setup
    │   ├───shop
    │   │   ├───complaints
    │   │   │   ├───complaint
    │   │   │   ├───complaint-resolution-dialog
    │   │   │   ├───complaint-status-dialog
    │   │   │   └───complaints
    │   │   ├───deliveries
    │   │   │   ├───add-delivery
    │   │   │   ├───deliveries
    │   │   │   └───delivery
    │   │   ├───items
    │   │   │   ├───add-item
    │   │   │   ├───item
    │   │   │   ├───items
    │   │   │   ├───new-price-dialog
    │   │   │   └───special-offer-dialog
    │   │   ├───orders
    │   │   │   ├───add-order
    │   │   │   ├───order
    │   │   │   ├───order-status-dialog
    │   │   │   └───orders
    │   │   └───returns
    │   │       ├───return
    │   │       ├───returns
    │   │       └───status-dialog
    │   └───staff
    │       ├───employees
    │       │   ├───add-employee
    │       │   ├───employee
    │       │   └───employees
    │       ├───holidays
    │       │   ├───add-holiday
    │       │   └───manage-holidays-dialog
    │       └───teams
    │           ├───team
    │           └───teams
    ├───assets
    └───environments
```

## <a name="6">Quick start guide</a> [&#8250;&#8250;&#8250;](#0)

Change:
```typescript
export const FRONTEND_URL = 'https://erp-mes-frontend.herokuapp.com/';
export const BACKEND_URL = 'https://erp-mes-backend.herokuapp.com/';
```

to:

```typescript
export const FRONTEND_URL = 'http://localhost:4200/';
export const BACKEND_URL = 'http://localhost:8080/';
```

in global.ts, then use Angular CLI:

```
npm install
ng serve
```

## <a name="7">Back-end repository</a> [&#8250;&#8250;&#8250;](#0)

Find back-end repository on Github: [plkpiotr/erp-mes-backend](https://github.com/plkpiotr/erp-mes-backend)

## <a name="8">Heroku platform</a> [&#8250;&#8250;&#8250;](#0)

Check out ERP-MES: [erp-mes-backend.herokuapp.com](https://erp-mes-backend.herokuapp.com/) and [erp-mes-frontend.herokuapp.com](https://erp-mes-frontend.herokuapp.com/).

Visit both of the links. First of them launches back-end layer and the database (if it is inactive) while the second contains front-end layer with login form.

Then use one of the following data:

Email: `patrycja@erp-mes.pl`

Password: `haslo123`

or

Email: `piotr@erp-mes.pl`

Password: `haslo123`
