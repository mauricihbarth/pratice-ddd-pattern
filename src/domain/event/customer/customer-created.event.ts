import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOcurrend: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurrend = new Date();
        this.eventData = eventData;
    }
}