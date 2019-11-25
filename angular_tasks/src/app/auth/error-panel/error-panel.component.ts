import {Component, Input, OnInit} from '@angular/core';
import {IError} from "../ierror";

@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.less']
})
export class ErrorPanelComponent implements OnInit {

  constructor() {
    this.localize.set('auth/user-not-found', 'Пользователь с таким логином не найден');
  }

  _message: string;
  _obj: IError;

  @Input('obj')
  set obj(_obj: IError) {
    this._message = this.getText(_obj)
    this._obj = _obj;
  }

  get obj(): IError { return this._obj; }

  localize: Map<string, string> = new Map<string, string>();

  getText(obj): string {
    console.log('getText', obj);
    if(!obj) {
      return '';
    }
    if (this.localize.has(obj.code)) {
      return this.localize.get(obj.code);
    }

    return obj.message;
  }

  ngOnInit() {
  }

}
