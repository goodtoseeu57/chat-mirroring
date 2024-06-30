// Define the ChatComponent interface
interface ChatComponent {
  id: number;
  question: string;
  children: ChatComponent[];
}

// Define the ChatOptionLeaf class for leaf nodes
class ChatOptionLeaf {
  id: number;
  question: string;
  children: ChatComponent[] = [];

  constructor(option: { id: number; question: string }) {
    this.id = option.id;
    this.question = option.question;
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

// Define the ChatOptionComposite class for composite nodes
class ChatOptionComposite {
  id: number;
  question: string;
  children: ChatComponent[] = [];

  constructor(option: {
    id: number;
    question: string;
    children?: ChatComponent[] | ChatComponent;
  }) {
    this.id = option.id;
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

interface Iterator<T> {
  hasNext(): boolean;
  hasNextOptionGroup(): boolean;
  next(): T[] | T;
}

export class ChatComponentIterator implements Iterator<ChatComponent> {
  constructor(private components: ChatComponent) {}

  hasNext(): boolean {
    return this.components.children.length > 0;
  }

  isNextOptionLeaf(): boolean {
    return this.components.children.length === 0;
  }

  hasNextOptionGroup(): boolean {
    return this.components.children.length > 1;
  }

  next(): ChatComponent[] | ChatComponent {
    return this.isNextOptionLeaf()
      ? this.components.children[0]
      : this.components.children;
  }
}

// Function to print the chat component tree
function printChatComponent(
  component: ChatComponent,
  indent: string = ''
): void {
  console.log(`${indent}${component.question}`);
  const iterator = new ChatComponentIterator(component);
  while (iterator.hasNext()) {
    printChatComponent(component);
  }
}

// JSON data
const chatOptions: ChatComponent = {
  id: 0,
  question: 'How can I assist you today?',
  children: [
    {
      id: 1,
      question: 'Technical Support',
      children: [
        {
          id: 2,
          question: 'Software Issues',
          children: [
            {
              id: 3,
              question: 'Cannot install software',
              children: [
                {
                  id: 26,
                  question: 'Error messages during installation',
                  children: [],
                },
                { id: 27, question: 'Insufficient disk space', children: [] },
                { id: 28, question: 'Installation freezes', children: [] },
              ],
            },
            {
              id: 4,
              question: 'Software crashes',
              children: [
                { id: 29, question: 'Crashes on startup', children: [] },
                { id: 30, question: 'Crashes during use', children: [] },
                { id: 31, question: 'Specific error codes', children: [] },
              ],
            },
            {
              id: 11,
              question: 'Slow performance',
              children: [
                { id: 32, question: 'High CPU usage', children: [] },
                { id: 33, question: 'High memory usage', children: [] },
                { id: 34, question: 'Lagging or freezing', children: [] },
              ],
            },
            {
              id: 12,
              question: 'Compatibility issues',
              children: [
                { id: 35, question: 'OS compatibility', children: [] },
                { id: 36, question: 'Hardware compatibility', children: [] },
                { id: 37, question: 'Other software conflicts', children: [] },
              ],
            },
          ],
        },
        {
          id: 5,
          question: 'Hardware Issues',
          children: [
            { id: 6, question: "Computer won't start", children: [] },
            { id: 7, question: 'Keyboard not working', children: [] },
            { id: 13, question: 'Screen display issues', children: [] },
            { id: 14, question: 'Battery problems', children: [] },
          ],
        },
        {
          id: 15,
          question: 'Network Issues',
          children: [
            { id: 16, question: 'Internet connectivity', children: [] },
            { id: 17, question: 'WiFi not working', children: [] },
            { id: 18, question: 'VPN issues', children: [] },
          ],
        },
      ],
    },
    {
      id: 8,
      question: 'Customer Service',
      children: [
        { id: 9, question: 'Billing issue', children: [] },
        { id: 10, question: 'Account management', children: [] },
        { id: 19, question: 'Update account details', children: [] },
        { id: 20, question: 'Cancel subscription', children: [] },
      ],
    },
    {
      id: 21,
      question: 'Sales',
      children: [
        { id: 22, question: 'Product information', children: [] },
        { id: 23, question: 'Pricing details', children: [] },
        { id: 24, question: 'Place an order', children: [] },
        { id: 25, question: 'Order status', children: [] },
      ],
    },
  ],
};

// Create the root composite component from the JSON data
const rootComponent = new ChatOptionComposite(chatOptions);

console.log(
  'Chat Component Tree:',
  new ChatComponentIterator(rootComponent).next()
);
