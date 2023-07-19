import EventInterface from "./event.interface";

export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
    //This method is called when the event is triggered.  
    handle(event: T): void;

}