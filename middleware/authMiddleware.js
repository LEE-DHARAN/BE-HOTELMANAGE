const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = {
  checkAuth: (req, res, next) => {
    
    const token = req.cookies.token;

    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // verify the token
    jwt.verify(token, JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }

     
      req.userId = user.id;

     
      next();
    });
  },
  allowRoles: (roles) => {
    return async (req, res, next) => {
    
      const userId = req.userId;

      
      const user = await User.findById(userId);

      
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      
      next();
    };
  },
};

module.exports = auth;
