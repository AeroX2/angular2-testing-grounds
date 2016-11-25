import { TestBed, inject, async } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { User } from './user';
import { ChangeMeService } from './change-me.service';
import { ChangeMeComponent } from './change-me.component';

describe('Change Me Tests', () => {
    let component: ChangeMeComponent;
    let userForm: FormGroup;
    let randomForm: FormGroup;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ChangeMeComponent ],
            imports: [
                HttpModule,
            ],
            providers: [
                ChangeMeService,
                FormBuilder,
            ]
        });

        TestBed.overrideComponent(ChangeMeComponent, {
            set: {
                template: '<div>Overridden template here</div>',
                templateUrl: ''
            }
        });
    });

    it('Testing User Form', async(() => {
        TestBed.compileComponents().then(() => {

            component = TestBed.createComponent(ChangeMeComponent).componentInstance;
            component.ngOnInit();

            userForm = component.userForm;
            randomForm = component.randomForm;

            userForm.controls['firstName'].setValue("Lucille");
            userForm.controls['lastName'].setValue("Smith");
            component.submitForm(userForm.value, userForm.valid);

            expect(userForm.valid).toBe(true);
            expect(component.users).toContain({firstName: "Lucille", lastName: "Smith"});
        })
    }));

    it('Testing User Form 2', () => {
        userForm.controls['firstName'].setValue("James");
        userForm.controls['lastName'].setValue("Smith");
        component.submitForm(userForm.value, userForm.valid);

        expect(userForm.valid).toBe(true);
        expect(component.users).toContain({firstName: "Lucille", lastName: "Smith"});
        expect(component.users).toContain({firstName: "James", lastName: "Smith"});
    })

    it('Testing User Form for Duplicates', () => {
        userForm.controls['firstName'].setValue("James");
        userForm.controls['lastName'].setValue("Smith");
        component.submitForm(userForm.value, userForm.valid);

        expect(userForm.valid).toBe(true);
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

        for (let num of component.random.value) {
            expect(typeof num == "number").toBe(true);
        }
        expect(component.random.value.length).toBe(5);
    })

    it('Test Random Form Real', async(() => {
        randomForm.controls['minNum'].setValue(2);
        randomForm.controls['maxNum'].setValue(8);
        randomForm.controls['amount'].setValue(5);
        randomForm.controls['real'].setValue(true);
        component.getRandomNumber(randomForm.value, randomForm.valid)

        expect(component.random.value.length).toBe(5);
        for (let num of component.random.value) {
            expect(typeof num == "number").toBe(true);
        }
    }))
})
