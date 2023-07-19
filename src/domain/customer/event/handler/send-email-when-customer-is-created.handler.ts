import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../../../event/customer/customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
        console.log(`Sending email to ${event.eventData.name}`);
    }
}