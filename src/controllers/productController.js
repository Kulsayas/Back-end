import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//admin app
// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    //Add Image
    //ไว้คุม logic การ uplode ว่าจะขัดเก็บบน couldinary ยังไง มีการ uplode รูปได้ 4 รูป
    const image1 = req.files.image1 && req.files.image1[0]; //ไปดูว่า req.files.image1 มีของไหม ถ้ามี ไปหยิบ image ที่ index 0 เพราะเราจัดเก็บเป็น array เผื่ออนาคตเอาไปจัดเก็บแต่ละ catagory ได้
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined //item ของ image แต่ละอัน item ต้องไม่เป็น undefined นะถ้าเป็น updifine มันก็จะถูก fillter ออกเอาแค่รูปนั้น default เป็น undefine
    );

    //ติดต่อไปที่ cloudinay
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          //uploader เป็น biuldin method การใช้ .uplode(para) item.path เอาไฟล์ที่ถูกต้องจากคอมเรา
          resource_type: "image", //สิ่งที่เรากำหนดช่วยแจ้งด้วยว่า type เป็นอะไร
        });
        return result.secure_url; //img ถูกจัดเก็บไปที่ cloudinary แล้วจะสร้าง url เฉพาะให้กับรูปเรา
      })
    );

    //ต้องการเอา image Url จาก cloudinary มาจัดเก็บใน productData object ที่กำลังจะเอาไปเก็บ db ใน mongoDB
    //เตรียม Data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl, //image Url จาก cloudinary
      date: Date.now(), //บันทึก date ว่าถูกสร้างขึ้นวันเวลาอะไร
    };

    console.log(productData);

    //กำลังติดต่อไปหา mongoDB  เรากำลังสร้าง productใหม่
    const product = new productModel(productData); //เอา productData เก็บใน productModel
    await product.save(); //.save เป็น feature ของ mongoose ข้อมูลที่เราจัดเก็บเข้า product save ที่ database ด้วย

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product วิ่งไปที่ api end point ของ list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
