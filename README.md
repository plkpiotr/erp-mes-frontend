# <a name="0">ERP-MES (Front-end)</a>

- [Overview](#1)
- [Front-end technologies](#2)
- [ERP features](#3)
  - [Staff management](#3.1)
  - [Delivery and warehouse management](#3.2)
  - [Finance management and reporting](#3.3)
  - [Production planning](#3.4)
  - [Mailbox](#3.5)
- [MES features](#4)
  - [Key Performance Indicators](#4.1)
  - [Instant Messenger](#4.2)
  - [Kaizen Teian](#4.3)
  - [Kanban Board](#4.4)
  - [Task scheduling algorithm](#4.5)
- [Security](#5)
- [Project structure](#6)
- [Quick start guide](#7)
- [Back-end repository](#8)
- [Heroku platform](#9)


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

### <a name="3.1">Staff management</a> [&#8250;](#3)

The company staff is divided into managers and employees, each of whom is the application's user. In their own profile, each user can, for example, submit holiday requests. Managers can approve such requests for their subordinates. Basic contact (and contract - although only for the logged in user) information may be found in a user's profile.

![erp1](https://user-images.githubusercontent.com/18569675/53205231-0910c400-362e-11e9-9ee9-7b892223ddbb.PNG)

### <a name="3.2">Delivery and warehouse management</a> [&#8250;](#3)

Keeping track of the items stored in the warehouse. Automatic generation of recommended deliveries, based on customer demand and lean management principles. All online store operations (orders, complaints, returns) are immediately reflected on the warehouse state.

### <a name="3.3">Finance management and reporting</a> [&#8250;](#3)

Storing, updating and analysing all the company's financial operations. Automatic generation of monthly reports. Financial estimates for a given period of time (by default: month), which are calculated based on data gatheres by previous reports.

![erp2](https://user-images.githubusercontent.com/18569675/53205339-4f662300-362e-11e9-9420-b146bd85c36e.PNG)

### <a name="3.4">Production planning</a> [&#8250;](#3)

Monitoring if the amount of work planned for a given day does not exceed the assumed daily plan and if so - notifying the person responsible. Possibility to introduce special production plans. Making sure all orders, complaints and returns are resolved without delays. 

![erp3](https://user-images.githubusercontent.com/18569675/53206128-702f7800-3630-11e9-9fc1-10aacbc0efe8.PNG)

### <a name="3.5">Mailbox</a> [&#8250;](#3)

Automatic generation of first login password and sending it via e-mail when registering a new user. Automatic notifications of order/complaint/return status change sent to customers. Possibility of e-mail communication between the company and its customers.

![erp4](https://user-images.githubusercontent.com/18569675/53206234-b1c02300-3630-11e9-9f3c-e641bbca48a1.PNG)

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

## <a name="5">Security</a> [&#8250;&#8250;&#8250;](#0)

- Only registered users can acces the application.
- Access is granted based on the JWT token sent as request header.
- Upon first login attempt, a first login password is used and the user needs to set their own password.
- Each request is filtered by Spring Security mechanisms and access to given resources is granted based on the user's role in the company.

## <a name="6">Project structure</a> [&#8250;&#8250;&#8250;](#0)

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

## <a name="7">Quick start guide</a> [&#8250;&#8250;&#8250;](#0)

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

## <a name="8">Back-end repository</a> [&#8250;&#8250;&#8250;](#0)

Find back-end repository on Github: [plkpiotr/erp-mes-backend](https://github.com/plkpiotr/erp-mes-backend)

## <a name="9">Heroku platform</a> [&#8250;&#8250;&#8250;](#0)

Check out ERP-MES: [erp-mes-backend.herokuapp.com](https://erp-mes-backend.herokuapp.com/) and [erp-mes-frontend.herokuapp.com](https://erp-mes-frontend.herokuapp.com/).

Visit both of the links. First of them launches back-end layer and the database (if it is inactive) while the second contains front-end layer with login form.

Then use one of the following data:

Email: `patrycja@erp-mes.pl`

Password: `haslo123`

or

Email: `piotr@erp-mes.pl`

Password: `haslo123`
