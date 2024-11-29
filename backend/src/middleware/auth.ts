import { db } from "../db";
import { verifyToken } from "../utils";

export const authenticateJWT = async (
    req: any,
    res: any,
    next: any
  ) => {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded: any = verifyToken(token);
      let user = await db.user.findFirst({
        where: {
          email: decoded.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          progress:true,
        },
      });
  
      if (!user) return res.status(403).json({ message: "User not found" });
      
      let u = { ...user };
      req.user = { user: u, token };
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
  };