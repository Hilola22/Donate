import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ProductOrder } from "../product-orders/models/product-order.model";
import { Users } from "../users/models/user.model";

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const order = await ProductOrder.findByPk(createPaymentDto.order_id);
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    const user = await Users.findByPk(createPaymentDto.user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll({
      include: [
        { model: ProductOrder },
        { model: Users, attributes: ["full_name", "email"] },
      ],
    });
  }

  findOne(id: number) {
    return this.paymentModel.findByPk(id, {
      include: [
        { model: ProductOrder },
        { model: Users, attributes: ["full_name", "email"] },
      ],
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.update(
      updatePaymentDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (!payment) {
      throw new NotFoundException("Payment not found");
    }
    return payment[1][0];
  }

  async remove(id: number) {
    const result = await this.paymentModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-payment deleted!`;
    }
    return `${id}-payment not found!`;
  }
}
