import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './chat.service';
import my from './my.json';
import { ChatComponent } from '../placeholder/iterator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chat-mirroring';
  chatComponent!: ChatComponent;
  chatHistory: ChatComponent[] = [];
  minimized = false;
  closed = false;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatComponent = this.chatService.createChatOptionComposite(my);
    this.chatHistory.push(this.chatComponent);

    if (this.chatComponent.autoNext) {
      setTimeout(() => {
        this.sendBotResponse(this.chatComponent);
      }, 1000);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleMinimize() {
    this.minimized = !this.minimized;
  }

  closeChatbot() {
    this.closed = true;
  }

  openChatbot() {
    this.closed = false;
    this.minimized = false;
  }

  toggleChatbot() {
    if (this.closed) {
      this.openChatbot();
    } else {
      this.closeChatbot();
    }
  }

  scrollToBottom(): void {
    console.log('scrolling to bottom');
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed', err);
    }
  }

  sendBotResponse(chatComponent: ChatComponent) {
    if (chatComponent.children && chatComponent.children.length > 0) {
      const nextComponent = chatComponent;
      this.chatHistory.push(nextComponent);
      this.chatComponent = nextComponent;
      console.log(this.chatComponent);

      if (nextComponent.autoNext) {
        setTimeout(() => {
          this.sendBotResponse(nextComponent.children[0]);
        }, 2000);
      }
    }
  }
}
