import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from './user';

@Component({
    selector: 'change-me',
    templateUrl: 'change-me.component.html'
})

export class ChangeMeComponent implements OnInit {
    users: User[] = [];
    newUser: User = new User();

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.maxLength(15)]],
            lastName: ['', [Validators.required, Validators.maxLength(15)]]
        });
    }

    submitForm1() : void {
        let exists = false;

        for (let user of this.users) {
            if (user.firstName === this.newUser.firstName && 
                user.lastName === this.newUser.lastName) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            let newUser = new User();
            newUser.firstName = this.newUser.firstName;
            newUser.lastName = this.newUser.lastName;
            this.users.push(newUser);
        }
    }

    submitForm2(userForm: User, valid: boolean): void {
        let exists = false;

        for (let user of this.users) {
            if (user.firstName === userForm.firstName && 
                user.lastName === userForm.lastName) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            this.users.push(userForm);
        }
    }
}