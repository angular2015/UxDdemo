import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ApiServiceService} from '../provider/api-service.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    itemRef: AngularFireObject<any>;
    constructor(private db: AngularFireDatabase, private route: ActivatedRoute,
        private router: Router, private apiService: ApiServiceService) {
        let userId = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyAyJg9t6j6PKZ6St9IFXwWssmrqr0Iet5k:[DEFAULT]'));
        console.log(userId['uid']);
        if (userId['uid'] && userId['uid'] != null) {
            this.itemRef = db.object('registeredUsers/' + userId['uid']);
            this.itemRef.valueChanges().subscribe(action => {
                console.log(action);
                localStorage.setItem('userDetail', JSON.stringify({uid: userId['uid'], data: {action}}))
            });
        }
    }

    ngOnInit() {
    }
    view(){
        console.log('view');
    }
    logout() {
        this.apiService.logout().then(data => {
            console.log(data);
            localStorage.removeItem('userDetail');
            this.router.navigate(['login']);
        });
    }
}
