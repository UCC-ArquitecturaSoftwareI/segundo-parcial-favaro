/**
 * EstadiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  rentals: async function (req, res) {
    let estadias = await Estadia.find({rent: req.params.id});
    res.view('pages/rental', {estadias: estadias});
  },

  newRental: async function (req, res) {
    let id = req.param('id');

    let initialDate = req.param('initialDate');
    let finalDate = req.param('finalDate');
    let paymentMethod = req.param('paymentMethod');
    let valuePerDay = req.param('valuePerDay');
    let alojamiento = req.params.id;
    let guestID = req.param('guestID');


    let rentals = await Estadia.create({
      initialDate: initialDate,
      finalDate: finalDate,
      paymentMethod: paymentMethod,
      valuePerDay: valuePerDay,
      rent: alojamiento,
      guest: guestID
    });

    res.redirect('/rental/' + id);
  },

  newRentalInvisible: function (req, res) {
    res.view('pages/newRental');
  }
};

