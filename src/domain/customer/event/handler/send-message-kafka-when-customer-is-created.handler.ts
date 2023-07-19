import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../../../event/customer/customer-created.event";

export default class SendMessageKafkaWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        console.log(`Publishing message in kafka to ${event.eventData.name}`);
    }
}