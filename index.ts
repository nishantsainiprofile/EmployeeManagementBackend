// import express, { Request, Response } from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import  { Document } from "mongoose";
// import bodyParser from "body-parser";
// import Employee from "./models/Employee";


// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5002;

// const connectToMongoDB = async () => {
//     try {
//       await mongoose.connect("mongodb+srv://nishant:rfRisP9JhzYKCWBD@cluster0.chi3o.mongodb.net/" );
//       console.log('Connected to MongoDB successfully');
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//     }
//   };
//   connectToMongoDB();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// // app.use("/api/employees", employeeRoutes);

// /*------------------ Define TypeScript Interface---------------------*/

// interface IEmployee extends Document {
//     name: string;
//     email: string;
//     position: string;
//     department?: string;
//     salary?: number;
//   }
//   // Create Mongoose Schema

//   const employeeSchema = new mongoose.Schema<IEmployee>({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     position: { type: String, required: true },
//     department: String,
//     salary: Number,
//   });
//   // Create Model
//   const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
// /*--------------- Create new employee---------------------*/
// app.post("/", async (req: Request, res: Response) => {
//     try {
//       const { name, email, position, department, salary } = req.body;
//       const newEmployee = new Employee({ name, email, position, department, salary });
//       const saved = await newEmployee.save();
//       res.status(201).json(saved);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to add employee." });
//     }
//   });
//   /*-------------- Get all employees--------------------*/
//   app.get("/", async (_req: Request, res: Response) => {
//     try {
//       const employees = await Employee.find();
//       res.json(employees);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to fetch employees." });
//     }
//   });
// /*------------------Get single employee by ID----------------*/
// app.get("/:id", async (req: Request, res: Response) => {
//     try {
//       const employee = await Employee.findById(req.params.id);
//       if (!employee) return res.status(404).json({ message: "Employee not found" });
//       res.json(employee);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to fetch employee." });
//     }
//   });
// /*--------------------- Update employee by ID-------------------*/
// app.put("/:id", async (req: Request, res: Response) => {
//     try {
//       const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!updated) return res.status(404).json({ message: "Employee not found" });
//       res.json(updated);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to update employee." });
//     }
//   });
//   app.get("/:id", async (req: Request, res: Response) => {
//     try {
//       res.json({ id: req.params.id });
//     } catch (err) {
//       res.status(500).json({ message: "Error" });
//     }
//   });
// /*---------------------- Delete employee by ID---------------------*/
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express, { Request, Response } from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import Employee from "./models/Employee"; // ✅ Correct path
import bodyParser from "body-parser";
import cors from "cors"
import  { Document } from "mongoose";
import bcrypt from 'bcrypt';
import { UserModels, IUser } from './models/User';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const router = express.Router();



// dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());


// const PORT = process.env.PORT || 5001;
app.use(cors({
    // origin: 'http://localhost:5174', // Replace with your frontend URL
    origin: 'https://employee-management-frontend-yrk5.vercel.app/', // Replace with your frontend URL
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // Allow cookies if you're using them
  }));
const connectToMongoDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://nishant:rfRisP9JhzYKCWBD@cluster0.chi3o.mongodb.net/" );
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  connectToMongoDB();


app.post("/api/addemployees", async (req: Request, res: Response) => {
    try {
      const { name, email, position, department, salary } = req.body;
      const newEmployee = new Employee({ name, email, position, department, salary });
      const saved = await newEmployee.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: "Failed to add employee." });
    }
  });
  /*-------------- Get all employees--------------------*/
  app.get("/api/employeeList", async (_req: Request, res: Response) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch employees." });
    }
  });
  app.get('/api/employees/:id', async (req: Request, res: Response) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
      } 
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch employee.' });
    }
  });
/*--------------------- Update employee by ID-------------------*/
app.put('/api/employees/:id', async (req: Request, res: Response) => {
    try {
      const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        res.status(404).json({ message: 'Employee not found' });
      } else{
        res.status(200).json({updated , confirmition:"Employee data is updated successfully ",});
    }
    } catch (err) {
      res.status(500).json({ message: 'Failed to update employee.' });
    }
  });

app.delete('/api/employees/:id', async (req:Request, res:Response) => {
    try {
      const result = await Employee.findByIdAndDelete(req.params.id);
      if (!result) {
       res.status(404).json({ message: 'Employee not found' });
      }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete employee.' });
    }
  });


app.post('/api/EmployeeRegister', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
     res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {
    const existingUser: IUser | null = await UserModels.findOne({ email });
    if (existingUser) {
       res.status(409).json({ error: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new UserModels({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
     res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Register Error:', err);
     res.status(500).json({ error: 'Server error' });
  }
});

const JWT_SECRET = 'your-secret-key';

// POST /api/auth/login
app.post('/api/EmployeeLogin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
       console.log(email,password);
    try {
      const user = await UserModels.findOne({ email });
  
      // Check if user exists
      if (!user) {
         res.status(400).json({ error: 'Invalid email or password' });
         return
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         res.status(400).json({ error: 'Invalid email or password' });
         return
      }
  
      // Create JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        sameSite: 'lax',
        maxAge: 3600000 // 1 hour in milliseconds
      });
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  /*-----------------this is authenticateUser------------------*/
//   import { authenticateUser } from './middleware/authMiddleware';

//   router.get('/api/check-login', authenticateUser, (req: Request, res: Response) => {
//     const user = req.user; // ✔️ No TS error anymore
//     res.status(200).json({ isLoggedIn: true, user });
//   });
  

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;