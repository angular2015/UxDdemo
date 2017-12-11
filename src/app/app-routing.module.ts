import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import { HomeComponent } from './home/home.component';
const routes: Routes = [
    {path: '', component: LoginComponent, },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home/:uid', component: HomeComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
