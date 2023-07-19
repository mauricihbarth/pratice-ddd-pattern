import Address from "../entity/address";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import CustomerUpdatedEvent from "../event/customer/customer-updated.event";
import SendEmailWhenCustomerIsCreatedHandler from "../event/customer/handler/send-email-when-customer-is-created.handler";
import SendEmailWhenCustomerIsUpdatedHandler from "../event/customer/handler/send-email-when-customer-is-updated.handler";
import SendMessageKafkaWhenCustomerIsCreatedHandler from "../event/customer/handler/send-message-kafka-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler2 = new SendMessageKafkaWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler4 = new SendEmailWhenCustomerIsUpdatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3);
        eventDispatcher.register("CustomerUpdatedEvent", eventHandler4);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler3);

        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler4);
    });


    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler2 = new SendMessageKafkaWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler4 = new SendEmailWhenCustomerIsUpdatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3);
        eventDispatcher.register("CustomerUpdatedEvent", eventHandler4);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler4);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler3);
        eventDispatcher.unregister("CustomerUpdatedEvent", eventHandler4);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(0);

    });

    it("should unregister all events handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler2 = new SendMessageKafkaWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler4 = new SendEmailWhenCustomerIsUpdatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3);
        eventDispatcher.register("CustomerUpdatedEvent", eventHandler4);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler4);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();

        expect(
            eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]
        ).toBeUndefined();
    });


    it("should notified all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler2 = new SendMessageKafkaWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler4 = new SendEmailWhenCustomerIsUpdatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");
        const spyEventHandler4 = jest.spyOn(eventHandler4, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3);
        eventDispatcher.register("CustomerUpdatedEvent", eventHandler4);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler4);

        const productCreatedEvent = new ProductCreatedEvent({

            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
            email: "purchasingdepartment@fullcycle.com"
        });
        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        const customer = new Customer("123", "Wolfgang Amadeus Mozart");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            endereco: customer.Address
        });
        //Quando o notify for executado os handlers SendMessageKafkaWhenCustomerIsCreatedHandler.handle() e SendEmailWhenCustomerIsCreatedHandler.handle() devem ser chamados
        eventDispatcher.notify(customerCreatedEvent);
        customer.changeAddress(address);

        let eventDataChangeAdress = {
            id: customer.id,
            name: customer.name,
            address: customer.Address
        }
        const customerUpdatedEvent = new CustomerUpdatedEvent(eventDataChangeAdress);
        eventDispatcher.notify(customerUpdatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(spyEventHandler3).toHaveBeenCalled();
        expect(spyEventHandler4).toHaveBeenCalled();
    });
});