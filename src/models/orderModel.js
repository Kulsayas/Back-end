import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  items: { type: Array, require: true },
  amount: { type: Number, require: true },
  address: { type: Object, require: true },
  status: { type: String, require: true, default: "Order Placed" },
  paymentMethod: { type: String, require: true },
  payment: { type: Boolean, require: true, default: "false" },
  date: { type: Number, require: true },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
//เช็คว่า Models ไหนบ้างใน function ที่เราสร้าง มันจะไม่สร้างใหม่ || mongoose.model("order", orderSchema) มันจะเป็นการสร้างใหม่ทุกครั้ง โดยใช้โครงของ orderSchema โดยที่ model คือ order

export default orderModel;
