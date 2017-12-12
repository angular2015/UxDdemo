import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['../app.component.css'],
})

export class ViewComponent {
  data: any;
  datas: any;
itemRef: AngularFireObject<any>;
userId:any;
  constructor(
    private db: AngularFireDatabase
  ) {
    this.userId = JSON.parse(localStorage.getItem('userDetail'))
  }
  ngOnInit() {
    this.view();
  }
  view() {
     this.itemRef = this.db.object('task/' + this.userId['uid']);
            this.itemRef.valueChanges().subscribe(action => {
                console.log(action.data);
                this.data=action.data;
            });

  }
 

}
