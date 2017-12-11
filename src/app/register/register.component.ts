import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ApiServiceService} from '../provider/api-service.service';
import {User} from '../user'
@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['../app.component.css'],

})

export class RegisterComponent implements OnInit {
    form: FormGroup;
    registeruser: any = {};
    user: any = {};
    error: any;

    constructor(
        private formBuilder: FormBuilder,
        private RegisterService: ApiServiceService,
        private router: Router

    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: ['', Validators.required],
            con_password: ['', Validators.required]

        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && this.form.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });

    }
    reset() {
        this.form.reset();
    }
    onSubmit() {
        if (this.form.valid) {
            this.RegisterService.signup(this.form.value.email, this.form.value.password)
                .then(data => {
                    console.log('1--------', data);
                    this.RegisterService.saveUserInfoFromForm(data.uid, this.form.value.name, this.form.value.email,this.form.value.phoneNumber).then(() => {
                        this.router.navigate(['home']);
                    })
                        .catch((error) => {
                            this.error = error;
                        });

                }).catch((error) => {
                    console.log('2-----', error);
                    alert(error.message)
                });
        }
        else {
            this.validateAllFormFields(this.form);
        }
    }
}
