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
  modifier: string;

  constructor(
    header: string = "",
    body: string = "",
    displayTime: number = 1,
    additionalInfo: string = "",
    modifier: string = MessageEnum.IS_INFO
  ) {
    this.header = header;
    this.body = body;
    this.displayTime = displayTime;
    this.additionalInfo = additionalInfo;
    this.modifier = modifier;
  }
};

// Hack to use string enums
interface ClassModifiers{
  IS_INFO: string;
  IS_SUCCESS: string;
  IS_DANGER: string;
  IS_WARNING: string;
}

export const MessageEnum =<ClassModifiers> Object({
  IS_INFO : "is-info",
  IS_DANGER : "is-danger",
  IS_SUCCESS : "is-success",
  IS_WARNING : "is-warning",
});