const router = require("express").Router();
const customer = require("../controllers/customer.controller")
router.post("/", customer.create);
router.put("/pay", customer.completePayment);
router.get("/unpaid", customer.getAllCustomers);
module.exports = router
