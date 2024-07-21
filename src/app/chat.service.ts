import { Injectable } from '@angular/core';
import { ChatComponent, ChatOptionComposite } from '../placeholder/iterator';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  createChatOptionComposite(option: {
    id: number;
    question: string;
    children?: ChatComponent[] | ChatComponent;
  }): ChatOptionComposite {
    return new ChatOptionComposite(option);
  }
}
