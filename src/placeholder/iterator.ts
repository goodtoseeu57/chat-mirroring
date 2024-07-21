// Define the ChatComponent interface
export interface ChatComponent {
  id: number;
  question: string;
  autoNext: boolean;
  children: ChatComponent[];
}

// Define the ChatOptionLeaf class for leaf nodes
export class ChatOptionLeaf {
  id: number;
  question: string;
  children: ChatComponent[] = [];
  autoNext: boolean;

  constructor(option: { id: number; question: string }) {
    this.id = option.id;
    this.question = option.question;
    this.autoNext = true;
  }

  getId(): number {
    return this.id;
  }

  getQuestion(): string {
    return this.question;
  }

  getChildren(): ChatComponent[] {
    return this.children;
  }
}

export type ChatOption = ChatComponent;

// Define the ChatOptionComposite class for composite nodes
export class ChatOptionComposite {
  id: number;
  question: string;
  autoNext: boolean;
  children: ChatComponent[] = [];

  constructor(option: {
    id: number;
    question: string;
    autoNext?: boolean;
    children?: ChatComponent[] | ChatComponent;
  }) {
    this.id = option.id;
    this.autoNext = option.autoNext || false;
    this.question = option.question;
    if (option.children) {
      if (Array.isArray(option.children)) {
        option.children.forEach((child) => this.addChild(child));
      } else {
        this.addChild(option.children);
      }
    }
  }

  getId(): number {
    return this.id;
  }

  getQuestion(): string {
    return this.question;
  }

  getChildren(): ChatComponent[] {
    return this.children;
  }

  private addChild(child: ChatComponent): void {
    if (child.children && child.children.length > 0) {
      this.children.push(new ChatOptionComposite(child));
    } else {
      this.children.push(new ChatOptionLeaf(child));
    }
  }
}

// Define the Iterator interface
