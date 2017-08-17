import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {
  messageUpdated = new EventEmitter<Message>();

  constructor() { }
}

export class Message {
  header: string;
  body: string;
  additionalInfo: string;
  displayTime: number;

  constructor(header: string = "", body: string = "", displayTime: number = 1, additionalInfo: string = "") {
    this.header = header;
    this.body = body;
    this.displayTime = displayTime;
    this.additionalInfo = additionalInfo;
  }
};

export enum MessageClass {
  none = 1,
  info = 2,
  warning = 3
};