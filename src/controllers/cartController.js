import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId); //userModel ติดต่อไปยัง db หา userID
    //ควบคุมการทำงานของ cart
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      //ถ้ามีของอยู่ใน cart
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }); //model mongoose คือการติดต่อกับ db

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId); //mongoose ติดต่อ db mongoDB ไปเพื่อเอาข้อมูล UserId นี้ไปเก็บใน userData รอใช้งานต่อ
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data ไปเอาข้อมูลมาจาก DB
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData; //userData.cartData ข้อมูลที่เราได้ res. กลับมา

    res.json({ success: true, cartData }); //โชว์ให้ดูว่า cartData มีอะไร
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
