import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
firebase.initializeApp({
  apiKey: 'AIzaSyCsl6dBsTSyxO8Soq3IN4QbuNHiWaT9kpc',
  authDomain: 'ngnews-201320.firebaseapp.com',
  databaseURL: 'https://ngnews-201320.firebaseio.com',
  projectId: 'ngnews-201320',
  storageBucket: 'ngnews-201320.appspot.com',
  messagingSenderId: '468345482231'
});
  }
}
