const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/*const auth = {
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

module.exports = auth;*/




const auth = {
  // Middleware to check if the user is authenticated
  verifyLogin: async (request, response, next) => {
    // get the token from the http only cookies
    const token = request.cookies.token;

    // if the token does not exist, return an error message
    if (!token) {
      return response.status(401).json({ message: "Access denied" });
    }

    // verify the token
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      request.userId = verified.id;
    } catch (error) {
      return response.status(400).json({ message: "Invalid token" });
    }

    next();
  },
  // Middleware to authorize the user based on the role
  allowRoles: (roles) => {
    return async (request, response, next) => {
      // Get the id from the request object
      const userId = request.userId;

      // Get the user from the database
      const user = await User.findById(userId);

      // check if the user's role is in the roles array
      if (!roles.includes(user.role)) {
        return response.status(403).json({ message: "Forbidden" });
      }

      next();
    };
  },
};

module.exports = auth;
