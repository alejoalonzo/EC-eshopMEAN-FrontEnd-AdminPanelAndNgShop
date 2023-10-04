//import { User } from "../../../../users/src/lib/models/user";
import { User } from "@bluebits/users";
import { OrderItem } from "./order-item";

export class Order{
    id?: string;
    orderItems?: OrderItem[];//add '[]' to run the loop *ngFor in the html of order-detail
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    phone?: string;
    status?: any;
    totalPrice?: number;
    user?: any;
    dateOrdered?: string;
    _id?: string;
}
