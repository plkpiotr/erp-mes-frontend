import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent {

  password: string;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute) { }

  submit() {
    this.loginService.validateUser(this.route.snapshot.params['id'], this.password);
  }


}
