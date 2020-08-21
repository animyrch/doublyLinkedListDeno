import { assert, assertEquals } from "https://deno.land/std@0.64.0/testing/asserts.ts";
import { LinkedList, ListNode } from "./LinkedList.ts";

const get_LinkedList_instance = (): LinkedList => { 
  return new LinkedList();
}

const get_ListNode_instance = (value: string): ListNode => {
  return new ListNode(value);
}

const append_newNode_to_linkedList = (linkedList: LinkedList, newNode: ListNode): LinkedList => {
  return linkedList.append(newNode);
}

const when_ListNode_isInitialisedWithString = (testString: string):ListNode => {
  return get_ListNode_instance(testString);
}

const then_listNode_hasValuePropertyWithThatString = (listNode: ListNode, expectedString: string): void => {
  assert(listNode.value === expectedString);
}

const then_listNode_hasNextPropertyWithNullValue = (listNode: ListNode): void => {
  assert(listNode.next === null);
}

const then_listNode_hasPreviousPropertyWithNullValue = (listNode: ListNode): void => {
  assert(listNode.previous === null);
}

Deno.test("ListNode initial values", () => {
  const testString = "test string";
  const listNode = when_ListNode_isInitialisedWithString(testString);
  then_listNode_hasValuePropertyWithThatString(listNode, testString);
  then_listNode_hasNextPropertyWithNullValue(listNode);
  then_listNode_hasPreviousPropertyWithNullValue(listNode);
});


const when_LinkedList_isInitialised = (): LinkedList => {
  return get_LinkedList_instance();
}

const then_linkedList_hasHeadPropertyWithNullValue = (linkedList: LinkedList): void => {
  assert(linkedList.head === null);
}

const then_linkedList_hasTailPropertyWithNullValue = (linkedList: LinkedList): void => {
  assert(linkedList.tail === null);
}

Deno.test("LinkedList initial values", () => { 
  const linkedList = when_LinkedList_isInitialised();
  then_linkedList_hasHeadPropertyWithNullValue(linkedList);
  then_linkedList_hasTailPropertyWithNullValue(linkedList);
});

const given_LinkedList_isInitialised = ():LinkedList => {
  return get_LinkedList_instance();
}

const given_listNode_isInitialisedWithValue = (value: string): ListNode => {
  return get_ListNode_instance(value);
}


const when_append_methodIsCalledOnEmptyLinkedListWithANewNode = (emptyLinkedList: LinkedList, newNode: ListNode): LinkedList => {
  return append_newNode_to_linkedList(emptyLinkedList, newNode);
}

const then_append_methodShouldReturnUpdatedLinkedList = (newList: LinkedList, oldList: LinkedList): void => {
  assert(newList === oldList);
}

const then_linkedListShouldHaveTheNewNodeAsHeadValue = (linkedList: LinkedList, listNode: ListNode): void => {
  assert(linkedList.head === listNode);
}

const then_linkedListShouldHaveTheNewNodeAsTailValue = (linkedList: LinkedList, listNode: ListNode): void => {
  assert(linkedList.tail === listNode);
}


const then_headNodeOfLinkedListShouldHaveNextPropertyWithNullValue = (linkedList: LinkedList): void => {
  assert(linkedList.head!.next === null);
}
const then_tailNodeOfLinkedListShouldHaveNextPropertyWithNullValue = (linkedList: LinkedList): void => {
  assert(linkedList.tail!.next === null);
}


Deno.test("LinkedList first append", () => {
  const linkedList = given_LinkedList_isInitialised();
  const listNodeValue = "node value";
  const newNode = given_listNode_isInitialisedWithValue(listNodeValue);
  const returnedLinkedList = when_append_methodIsCalledOnEmptyLinkedListWithANewNode(linkedList, newNode);
  then_append_methodShouldReturnUpdatedLinkedList(returnedLinkedList, linkedList);
  then_linkedListShouldHaveTheNewNodeAsHeadValue(linkedList, newNode);
  then_linkedListShouldHaveTheNewNodeAsTailValue(linkedList, newNode);
  then_headNodeOfLinkedListShouldHaveNextPropertyWithNullValue(linkedList);
  then_tailNodeOfLinkedListShouldHaveNextPropertyWithNullValue(linkedList);
});

const given_linkedList_containsAnInitialNode = (): LinkedList => {
  const linkedList = get_LinkedList_instance();
  append_newNode_to_linkedList(linkedList, get_ListNode_instance("initial node"));
  return linkedList;
}

const when_aSecondNodeIsInserted = (linkedList: LinkedList, newNode: ListNode):void => {
  append_newNode_to_linkedList(linkedList, newNode);
}

const then_tailNodeOfLinkedListShouldPointToTheNewNode = (linkedList: LinkedList, newNode: ListNode): void => {
  assert(linkedList.tail!.value === newNode.value);
}

const then_nextPropertyOfThePreviousNodeOfTailShouldPointToTheNewNode = (linkedList: LinkedList, newNode: ListNode): void => {
  assert(linkedList.tail!.previous!.next!.value === newNode.value);
}

const then_valuePropertyOfHeadNodeShouldStayTheSame = (linkedList: LinkedList, initialHeadCopy: ListNode): void => {
  assert(linkedList.head!.value === initialHeadCopy.value);
}

Deno.test("LinkedList nth append", () => {  
  const linkedList = given_linkedList_containsAnInitialNode();
  const initalHeadCopy = {...linkedList.head} as ListNode;
  const newNode = given_listNode_isInitialisedWithValue("random value");
  when_aSecondNodeIsInserted(linkedList, newNode);
  then_tailNodeOfLinkedListShouldPointToTheNewNode(linkedList, newNode);
  then_nextPropertyOfThePreviousNodeOfTailShouldPointToTheNewNode(linkedList, newNode);
  then_valuePropertyOfHeadNodeShouldStayTheSame(linkedList, initalHeadCopy);
});


const given_linkedList_containsThreeNestedNodes = ({firstNodeValue, secondNodeValue, thirdNodeValue}: any): LinkedList => {
  return (new LinkedList()).append(new ListNode(firstNodeValue)).append(new ListNode(secondNodeValue)).append(new ListNode(thirdNodeValue));
}

const then_itReturnsAnIterableOfTypeStringWhereEachValueCorrespondsToNodes = (iteration: IterableIterator<ListNode | null>, {firstNodeValue, secondNodeValue, thirdNodeValue}: any): void => {
  let stepCounter = 1;
  let expectedValue = "";
  while (true) {
    const next = iteration.next();
    if (next.done) {
      break;
    }
    if (stepCounter === 1) {
      expectedValue = firstNodeValue;
    } else if (stepCounter === 2) {
      expectedValue = secondNodeValue;
    } else {
      expectedValue = thirdNodeValue;
    }
    assertEquals(next.value!.value, expectedValue);
  }
}

Deno.test("LinkedList iteration", () => {
  const nodeValues = {
    firstNodeValue: "first node",
    secondNodeValue: "second node",
    thirdNodeValue: "third node"
  };
  const linkedList: LinkedList = given_linkedList_containsThreeNestedNodes(nodeValues);
//  const iteration: Iterator<ListNode> = when_iterate_methodIsCalled(linkedList);
  then_itReturnsAnIterableOfTypeStringWhereEachValueCorrespondsToNodes(linkedList, nodeValues);
});
