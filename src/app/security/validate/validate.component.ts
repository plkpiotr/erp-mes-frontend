import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent {

  form: FormGroup;
  password: FormControl;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute) {
    this.password = new FormControl('', [
      Validators.required
    ]);
    this.form = new FormGroup({
      "password": this.password
    });
  }

  submit() {
    this.loginService.validateUser(this.route.snapshot.params['id'], this.form.get('password').value);
  }


}
