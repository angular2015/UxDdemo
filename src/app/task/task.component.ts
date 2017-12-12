import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import {User} from '../user';
import {ApiServiceService} from '../provider/api-service.service';
@Component({
    selector: 'app-task',
    templateUrl: 'task.component.html',
    styleUrls: ['../app.component.css'],

})
export class TaskComponent implements OnInit {

    CreateTaskForm: FormGroup;
    error: any;
    title: string;
    userId: {};
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private setItem: ApiServiceService
    ) {

        this.userId = JSON.parse(localStorage.getItem('userDetail'));
    }
    ngOnInit() {
        this.CreateTaskForm = this._formBuilder.group({
            task: [null, [Validators.required]],
            date: [null, [Validators.required]]
        });
    }
    createTask() {
        if (this.CreateTaskForm.valid) {
            console.log(this.CreateTaskForm);
            this.CreateTaskForm.value.date = this.CreateTaskForm.value.date.formatted;
            this.setItem.saveTask(this.userId['uid'],this.CreateTaskForm.value).then(data=>{
               console.log('task',data); 
               this.router.navigate(['/home/view']);
            });

        }
        else {
            this.validateFormFields(this.CreateTaskForm)
        }
    }
    isFieldValid(field: string) {
        return !this.CreateTaskForm.get(field).valid && this.CreateTaskForm.get(field).touched;
    }
    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        }
    }
    validateFormFields(_formGroup: FormGroup) {
        Object.keys(_formGroup.controls).forEach(field => {
            const control = _formGroup.get(field);
            if (control instanceof FormGroup) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateFormFields(control);
            }
        })
    }


}
