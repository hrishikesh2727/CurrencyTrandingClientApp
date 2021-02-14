import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(private _snackBar: MatSnackBar){}
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}


// ******************** Dialog ********************//
export class AlertDialog {
  constructor(
    public message: string,
    public type: DialogType,
    public okCallback: (val?: any) => any,
    public cancelCallback: () => any,
    public defaultValue: string,
    public okLabel: string,
    public cancelLabel: string) {

  }
}

export enum DialogType {
  alert,
  confirm,
  prompt
}
// ******************** End ********************//


// ******************** Growls ********************//
export class AlertCommand {
  constructor(
    public operation: 'clear' | 'add' | 'add_sticky',
    public message?: AlertMessage,
    public onRemove?: () => any) { }
}

export class AlertMessage {
  constructor(
    public severity: MessageSeverity,
    public summary: string,
    public detail: string) { }
}

export enum MessageSeverity {
  default,
  info,
  success,
  error,
  warn,
  wait
}
// ******************** End ********************//
