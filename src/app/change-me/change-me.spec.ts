import {it, describe, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';

import { User } from './user';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';

import { ChangeMeService } from './change-me.service';
import { ChangeMeComponent } from './change-me.component';

describe('Change Me Tests', () => {
    let component: ChangeMeComponent;
    let service: ChangeMeService;
    let userForm: FormGroup;
    let randomForm: FormGroup;

    beforeEach(inject([Http], (http: Http) => {
        service = new ChangeMeService(http);
        component = new ChangeMeComponent(service, new FormBuilder());
        userForm = component.userForm;
        randomForm = component.randomForm;
    }));

    it('Testing User Form', () => {
        userForm.controls['firstName'].setValue("Lucille");
        userForm.controls['lastName'].setValue("Smith");
        component.submitForm(userForm.value, userForm.valid);

        expect(userForm.valid).toBe(true);
        expect(component.users).toBeArray();
        expect(component.users).toContain({firstName: "Lucille", lastName: "Smith"});
    })

    it('Testing User Form 2', () => {
        userForm.controls['firstName'].setValue("James");
        userForm.controls['lastName'].setValue("Smith");
        component.submitForm(userForm.value, userForm.valid);

        expect(userForm.valid).toBe(true);
        expect(component.users).toBeArray();
        expect(component.users).toContain({firstName: "Lucille", lastName: "Smith"});
        expect(component.users).toContain({firstName: "James", lastName: "Smith"});
    })

    it('Testing User Form for Duplicates', () => {
        userForm.controls['firstName'].setValue("James");
        userForm.controls['lastName'].setValue("Smith");
        component.submitForm(userForm.value, userForm.valid);

        expect(userForm.valid).toBe(true);
        expect(component.users).toBeArray();
        expect(component.users.length).toBe(2);
    })

    it('Testing User Form for Invalid', () => {
        userForm.controls['firstName'].setValue("");
        userForm.controls['lastName'].setValue("Smith");
        component.submitForm(userForm.value, userForm.valid);

        expect(userForm.valid).toBe(false);
    })

    it('Test Random Form Fake', () => {
        randomForm.controls['minNum'].setValue(2);
        randomForm.controls['maxNum'].setValue(8);
        randomForm.controls['amount'].setValue(5);
        component.getRandomNumber(randomForm.value, randomForm.valid);

        expect(component.random.value).toBeArrayOfNumbers();
        expect(component.random.value).toBeArrayOfSize(5);
    })

    it('Test Random Form Real', () => {
        randomForm.controls['minNum'].setValue(2);
        randomForm.controls['maxNum'].setValue(8);
        randomForm.controls['amount'].setValue(5);
        randomForm.controls['real'].setValue(true);
        component.getRandomNumber(randomForm.value, randomForm.valid);

        expect(component.random.value).toBeArrayOfNumbers();
        expect(component.random.value).toBeArrayOfSize(5);
    })
})
