const Customer = require("../models/customer.model.js");
const resp = require("../utils/response.js");


exports.create = (req, res) => {
    if (!req.body) {
        resp(res, 400, {}, "No data Present");
    }


    const customer = new Customer({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        reg_date: req.body.reg_date,

    });


    Customer.create(customer, (err, data) => {
        if (err)
            resp(res, {}, 500, "Something went wrong");
        else resp(res, data, 200, "Customer Added");
    });

};
// to update the status to "isPaid"
exports.completePayment = (req, res) => {
    Customer.updateById(req.body.id, req.body.batch, (err, data) => {
        if (err) {
            if (err.msg) {
                resp(res, err, 404, "Entry not found");
            } else {
                resp(res, {}, 500, "Something went wrong");
            }
        } else {
            resp(res, data, 200, "Payment Successful");
        }
    })

}

//to get all the customers
exports.getAllCustomers = (req, res) => {
    Customer.getCustomers((err, data) => {
        if (err) {

            resp(res, {}, 500, "Something went wrong");

        } else {
            resp(res, data, 200, "Unpaid Customers");
        }
    })
}

