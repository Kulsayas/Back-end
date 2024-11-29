// Step 1
import express from "express";
import cors from "cors";
import "dotenv/config";
// Step 2
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
// Custom routes
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import user from "./models/userModel.js";

// App Config
const app = express(); //ทำให้มันเป็น json ได้
const port = process.env.PORT || 4000;

// Service connections
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

const allowedOrigins = [
  "https://artnakkk-frontend-admin.vercel.app",
  "http://localhost:5175", // For local development
  "http://localhost:5176", // For local development
];

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies or Authorizatio nheaders
  })
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", async (req, res) => {
  const userData = await user.find({});
  // res.send("API Working");
  res.json({
    userData,
  });
});

app.listen(port, () =>
  console.log("Server started on PORT : " + port + " 🌏 🙌")
);

/*
//step 1
import express from "express";
import cors from "cors";

//api config
const app = express();
const port = 3000;

//api
app.use(express.json()); //ทำให้มันเป็น json ได้
app.use(express.urlencoded({ extended: true })); //เอาไว้อ่าน payload ได้
app.use(cors()); //อนุญาตให้ origin  ให้ 2 port ที่แตกต่างกันเข้าถึงกันได้

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/
