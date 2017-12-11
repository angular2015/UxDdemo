import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    itemRef: AngularFireObject<any>;
    constructor(private db: AngularFireDatabase, private route: ActivatedRoute,
        private router: Router,params: ParamMap) {
        
        this.itemRef = db.object('registeredUsers/' + 'uid');
        this.itemRef.snapshotChanges().subscribe(action => {
            console.log(action);

        });
    }

    ngOnInit() {
    }

}
