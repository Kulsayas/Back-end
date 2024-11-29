import multer from "multer";
//multer เป็น node.js library ใช้โดยเฉพาะที่เรา uplode ไฟล์ต่างๆจากเครื่องเราได้ multerเขามาดูไฟล์ system ของคอมพิวเตอร์เรา
const storage = multer.diskStorage({
  //ต้องบอกเขาว่าไปเปิดเอาไฟล์จากที่ไหน และสามารถเปิดไฟล์ เอาไฟล์เก็บไว้ใน Object form uploade ของเรา ถ้าเป็น Image จะถูกไปเก็บที่ couldinary ถ้าเป็น text เก็บใน db
  filename: function (req, file, callback) {
    callback(null, file, originalname); //null ใส่เอาไว้ตาม parameter ในกรณีนี้เราไม่ได้ทำอะไรกับ req. ก็ใส่เป็น null ไปก่อน
  },
});
const uplode = multer({ storage });

export default uplode;

//เราต้องบอกสถานที่ ที่เราจะไปเรียนเอาไฟล์ขึ้นมาอยู่ที่ไหน multer.diskStorage(local computer เรา)
//เราต้องประกาศ storage แล้วค่อยเอา storage ป้อนเป็น parameter
