const { Customer, validate } = require("../models/customer");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
var custList = [];

router.get("/", auth, async (req, res) => {
  //find and sort on the basis of name
  const customers = [];
  res.send(custList);
});

router.post("/", auth, async (req, res) => {
  //post a new customer
  //const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = custList.push(customer);
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  //const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  let id = +req.params.id;
  const customer = custList.find(obj => +obj.id === id);

  customer = { id: customer.id, ...req.body };

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  //const customer = await Customer.findByIdAndRemove(req.params.id);
  let id = +req.params.id;
  const customer = custList.find(obj => +obj.id === id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  let ind = custList.find(obj => +obj.id === id);
  custList.splice(ind, 1);
  res.send(customer);
});

router.get("/:id", auth, async (req, res) => {
  //const customer = await Customer.findById(req.params.id).select("-__v");
  let id = +req.params.id;
  const customer = custList.find(obj => +obj.id === id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
