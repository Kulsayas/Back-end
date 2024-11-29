import jwt from "jsonwebtoken";
// middleware คั้นกลาง ระหว่าง api routh ถ้าผ่านเข้าไปได้ ก็จะเข้าถึง db เรา
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next(); //ถ้าไม่มี next เราจะได้ไม่ได้ object กลับมา
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//cath คือ ถ้าไม่ได้ของที่ติดต่อคืนกลับมา เราจะ cath error ออกมาให้ให้ user ดู มันอาจะทำให้โปรแกรมเราพังถ้าไม่มี cath
export default authUser;
