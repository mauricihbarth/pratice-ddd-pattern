import { BeforeFindAfterExpandIncludeAll } from "sequelize-typescript";
import OrderRepositoryInterface from "../../../../domain/checkout/order-repository-interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";


export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        })),
      },
      {
        where: {
          id: entity.id,
        },
      },

    );
  }


  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne(
        {
          where: {
            id,
          },
          include: ["items"],
          rejectOnEmpty: true,

        },
      );
    } catch (error) {
      throw new Error("Order not found");
    }

    const itemsOrder = orderModel.items.map((item) => (
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)));

    const order = new Order(orderModel.id, orderModel.customer_id, itemsOrder);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: ["items"],
    });

    const orders = ordersModel.map((orderModel) => {
      const itemsOrder = orderModel.items.map((item: any) => (
        new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      ));

      const order = new Order(orderModel.id, orderModel.customer_id, itemsOrder);
      return order;
    });

    return orders;
  }
}