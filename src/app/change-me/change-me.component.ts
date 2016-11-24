import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ChangeMeService } from './change-me.service';
import { User } from './user';

@Component({
    selector: 'change-me',
    templateUrl: 'change-me.component.html'
})

export class ChangeMeComponent implements OnInit {
    users: User[] = [];
	random: any = {};

    userForm: FormGroup;
    randomForm: FormGroup;

	subscription: Subscription;

    constructor(private changeMeService: ChangeMeService,
			    private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]]
        });

		let validators = [Validators.required, Validators.pattern('[0-9]{1,3}')];
		this.randomForm = this.formBuilder.group({
			minNum: [1, validators],
			maxNum: [10, validators],
			amount: [5, Validators],
			real: ['',[]]
		});
    }

    public submitForm(userTmp: User, valid: boolean): void {
		if (!valid) return;
        let exists = false;

        for (let user of this.users) {
            if (user.firstName === userTmp.firstName && 
                user.lastName === userTmp.lastName) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            this.users.push(userTmp);
        }
    }

	public getRandomNumber(randomTmp: any, valid: boolean): void {
		if (this.subscription) this.subscription.unsubscribe();

		this.random.real = randomTmp.real;
		this.random.value = [];

		if (randomTmp.real) {
			this.subscription = this.changeMeService.getRealRandomNumber(randomTmp.minNum, randomTmp.maxNum, randomTmp.amount).subscribe(
																		 numbers => this.random.value = numbers,
																		 error => console.log(error),
																		 () => console.log("Completed"));
		} else {
			this.subscription = this.changeMeService.getFakeRandomNumber(randomTmp.minNum, randomTmp.maxNum, randomTmp.amount).subscribe(
																		 numbers => this.random.value = numbers,
																		 error => console.log(error),
																		 () => console.log("Completed"));
		}
	}
}
