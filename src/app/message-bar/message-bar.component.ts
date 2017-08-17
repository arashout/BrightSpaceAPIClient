import { Component, OnInit} from '@angular/core';

import { MessageService, Message } from '../shared/message.service';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.css']
})

export class MessageBarComponent implements OnInit {
  message: Message = new Message();
  isDisplayed: boolean = false;
  // This is a handle for clearing the setTimeout 
  // Which is necessary if a new message is to be displayed before another has been cleared
  timeoutHandle: any = null; 

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messageUpdated.subscribe(
      (message: Message) => {
        if(this.timeoutHandle !== null){
          clearTimeout(this.timeoutHandle);
        }
        this.message = message;
        this.isDisplayed = true;

        // Remove notification after displayTime seconds
        this.timeoutHandle = setTimeout(() => { 
          this.isDisplayed = false;
          this.timeoutHandle = null;
        }, this.message.displayTime * 1000);
      }
    )
  }

}
