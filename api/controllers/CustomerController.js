/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  customers: async function (req, res) {
    let customers = await Customer.find({});
    res.view('pages/customer', {customers: customers});
  },


  newCustomer: async function (req, res) {
    let name = req.param('name');
    let lastName = req.param('lastName');
    let city = req.param('city');
    let members = req.param('members');
    let licensePlate = req.param('licensePlate');

    let customers = await Customer.create({
      name: name,
      lastName: lastName,
      city: city,
      members: members,
      licensePlate: licensePlate,
    });

    res.redirect('/customer');
  },

  newCustomerInvisible: function (req, res) {
    res.view('pages/newCustomer');
  },

};

