import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from 'src/app/core/models/user-dto.model';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  form: FormGroup;

  user: UserDto = {
    id: 1,
    name: 'Cesar',
    lastName: 'Riojas',
    secondLastName: 'Martinez',
    email: 'riojas@riojas.com',
    birthDate: '01/08/1984',
    phoneNumber: '8448806948',
    genre: 1,
    pwd: '123456',
  };

  constructor( private fb: FormBuilder ) {
    this.loadForm();
  }

  ngOnInit() {
  }

  onSubmit() {

    console.log( this.form.value );

  }

  reset() {
    console.log( this.form.controls.genre.value );
  }

  loadForm() {
    this.form = this.fb.group({
      id: [ this.user.id, [ Validators.required ] ],
      name: [ this.user.name, [ Validators.required ] ],
      lastName: [ this.user.lastName, [ Validators.required ] ],
      secondLastName: [ this.user.secondLastName, [ Validators.required ] ],
      email: [this.user.email, [Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')]],
      birthDate: [ this.user.birthDate, [ Validators.required ] ],
      phoneNumber: [ this.user.phoneNumber, [ Validators.required ] ],
      genre: [ this.user.genre.toString(), [ Validators.required ] ],
      pwd: [ this.user.pwd, [ Validators.required ] ],
    });
  }

}
