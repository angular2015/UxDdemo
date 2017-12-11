import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import {ApiServiceService} from '../provider/api-service.service';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['../app.component.css'],

})

export class LoginComponent implements OnInit {
    form: FormGroup;
    user: any = {};
    error: any;


    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private LoginService: ApiServiceService,
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            password: [null, Validators.required],
            email: [null, Validators.required],
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
            console.log(field);
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
            this.LoginService.login(this.form.value.email, this.form.value.password)
                .then(data => {
                    this.router.navigate(['home', {uid: data.uid}]);
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
