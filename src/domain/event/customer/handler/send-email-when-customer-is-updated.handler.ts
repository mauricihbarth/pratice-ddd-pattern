
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class SendEmailWhenCustomerIsUpdatedHandler implements EventHandlerInterface<CustomerUpdatedEvent>{
    handle(event: CustomerUpdatedEvent): void {
        console.log(`Adress data was updated. Follow more information "Endereço do cliente: id - ${event.eventData.id}, nome - ${event.eventData.name} alterado para: ${event.eventData.address}".  `);
    }
}