import 'rxjs/Rx';
import {Component, OnInit}                  from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router}  from '@angular/router';
import {NgClass}                            from "@angular/common";
import {JwtHelper}                          from 'angular2-jwt/angular2-jwt';

// Components
// ----------------------
import {FrontComponent} from "../pages/front/front.component";

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['css/app.component.css'],
  directives: [ROUTER_DIRECTIVES, NgClass],
  providers: []
})

//noinspection TypeScriptValidateTypes
@Routes([
  {path: '', component: FrontComponent}
])

export class AppComponent implements OnInit {

  activeItem:string;

  private _jwtHelper:JwtHelper = new JwtHelper();

  constructor(private _router:Router) {

    var token = localStorage.getItem('id_token');

    if (!token || this._jwtHelper.isTokenExpired(token)) {
      this._router.navigate(['login']);
    }
  };

  ngOnInit() {
    this.activeItem = 'Post';

    this._router.changes.subscribe(val => {
      window.scrollTo(0, 0);
    });
  }

  checkItem(path) {
    return this.activeItem == path;
  }

  navigate(path) {
    this.activeItem = path
    this._router.navigate([path]);
  }
}
