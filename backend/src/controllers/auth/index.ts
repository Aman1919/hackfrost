import { db } from "../../db";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils";
export const signup = async (req: any, res: any) => {
    try {
      const { name, password,email} = req.body;
   console.log(req.body)
      if (password.length <= 6) {
        console.log(password, "anlaks");
  
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long." });
      }
      const existingUser = await db.user.findFirst({
        where: {
          OR: [{ email: email.toLowerCase() }],
        },
      });
  
      if (existingUser) {
        if(existingUser.email === email)
          return res.status(400).json({ message: "Email already exists" });
      }
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await db.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashPassword,
          name: name,
        },
      });
      const token = generateToken({ id: newUser.id, email: newUser.email });
      res.status(200).json({ message: "User created successfully", token });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error", status: "error" });
    }
  };
  
  export const login = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
  
  
      const user = await db.user.findFirst({
        where: {
          email: email.toLowerCase(),
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
     
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = generateToken({ id: user.id, email: user.email });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const refresh = async (req: any, res: any) => {
    try {
      if (req.user) {
        res.status(200).json({
          user: req.user,
        });
      } else {
        res.status(401).json({
          user: null,
          message: "Unauthorized",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
        error,
      });
    }
  };