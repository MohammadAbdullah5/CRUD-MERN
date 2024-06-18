const express = require("express"); // Import express module that will be used to create the server.
const { create, userByID, read, list, remove, update } = require("../controllers/userController"); // Import userController module that will handle user requests.
const { requireSignin, hasAuthorization } = require("../controllers/authController");

const router = express.Router(); // Create a new router object.

router.get("/api/users", list); // Handle GET requests to /api/users using userController.list method.
router.post("/api/users", create); // Handle POST requests to /api/users using userController.create method.

router.param('userId', userByID); // When :userId routes will be used this function would be called
router.get("/api/users/:userId", requireSignin, read); // Handle GET requests to /api/users/:userId using userController.read method.
router.put("/api/users/:userId", requireSignin, hasAuthorization, update); // Handle PUT requests to /api/users/:userId using userController.update method.
router.delete("/api/users/:userId", requireSignin, hasAuthorization, remove); // Handle DELETE requests to /api/users/:userId using userController.remove method.


module.exports = router; // Export the router object.