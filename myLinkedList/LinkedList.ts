export interface IteratorResult<T> {
  done: boolean;
  value: T;
}

export class ListNode {
  value: string;
  next?: ListNode | null;
  previous?: ListNode | null;

  constructor (value: string) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export class LinkedList implements IterableIterator<ListNode | null> {
  head: ListNode | null;
  tail: ListNode | null;
  currentIteration: ListNode | null = null;

  constructor () {
    this.head = null;
    this.tail = null;
  }

 public append = (listNode: ListNode): LinkedList => {
  if (!this.head) {
    this.head = listNode;
    this.currentIteration = this.head;
  }

  if (this.tail) {
    this.tail.next = listNode;
    listNode.previous = this.tail;
  }
  this.tail = listNode;  
  
  return this; 
 } 

 public next():IteratorResult<ListNode | null> {
   if (this.currentIteration !== null) {
    const nextIteration = {
      done: false,
      value: {...this.currentIteration}
    };
    this.currentIteration = this.currentIteration.next ?? null;
    return nextIteration;
   } else {
    this.currentIteration = this.head;
    return {
      done: true,
      value: null
    }
   }
 }

 [Symbol.iterator](): IterableIterator<ListNode | null> {
  return this;
 }
}
