import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'chat-mirroring';
  chatComponent!: ChatComponent;
  chatHistory: ChatComponent[] = [];
  minimized = false;
  closed = false;
  closedDate: Date | null = null;
  unreadMessages = 0;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('bottomContainer') private bottomContainer!: ElementRef;

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

  toggleMinimize() {
    this.minimized = !this.minimized;

    if (!this.minimized) {
      this.unreadMessages = 0;
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottomIfNeeded();
  }

  private scrollToBottomIfNeeded(): void {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  closeChatbot() {
    if (!this.closed) {
      if (window.confirm('Are you sure you want to close the chatbot?')) {
        this.closed = true;
        this.minimized = true;
        this.closedDate = new Date();
      }
    }
  }

  sendBotResponse(chatComponent: ChatComponent) {
    if (chatComponent.children && chatComponent.children.length > 0) {
      const nextComponent = chatComponent;
      this.chatHistory.push(nextComponent);
      this.chatComponent = nextComponent;

      if (nextComponent.autoNext) {
        setTimeout(() => {
          this.sendBotResponse(nextComponent.children[0]);
          if (this.minimized) {
            this.unreadMessages++;
          }
        }, 3000);
      }
    }
  }
}
