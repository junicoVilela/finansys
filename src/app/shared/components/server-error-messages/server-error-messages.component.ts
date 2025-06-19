import { Component, OnInit, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-server-error-messages',
  templateUrl: './server-error-messages.component.html',
  styleUrls: ['./server-error-messages.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class ServerErrorMessagesComponent implements OnInit {

  @Input('server-error-message') serverErrorMessages: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
