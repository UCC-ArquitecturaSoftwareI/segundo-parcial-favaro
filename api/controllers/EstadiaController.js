/**
 * EstadiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  rentals: async function (req, res) {
    //If alojamientos or customers are deleted
    await Estadia.destroy({guest: null});
    await Estadia.destroy({rent: null});

    let estadias = await Estadia.find({rent: req.params.id}).populate('guest').sort('initialDate ASC');

    res.view('pages/rental', {estadias: estadias});
  },

  newRental: async function (req, res) {
    let idUrl = req.param('id');

    let initialDate = new Date(req.param('initialDate'));
    let finalDate = new Date(req.param('finalDate'));
    let days = Math.floor((Date.UTC(finalDate.getFullYear(), finalDate.getMonth(), finalDate.getDate()) - Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate())) / (1000 * 60 * 60 * 24));

    let paymentMethod = req.param('paymentMethod');
    let valuePerDay = req.param('valuePerDay');
    let totalValue = valuePerDay * days;
    let downPayment = (totalValue * 20) / 100;
    let alojamiento = req.params.id;
    let guestID = req.param('guestID');

    let rentals = await Estadia.create({
      initialDate: initialDate,
      finalDate: finalDate,
      paymentMethod: paymentMethod,
      valuePerDay: valuePerDay,
      totalValue: totalValue,
      downPayment: downPayment,
      rent: alojamiento,
      guest: guestID
    });

    res.redirect('/rental/' + idUrl);
  },

  newRentalInvisible: async function (req, res) {
    let customers = await Customer.find({});
    res.view('pages/newRental', {customers: customers});
  },

  deleteEstadia: async function (req, res) {
    let deleteEstadia = req.param('id');

    await Estadia.destroy({id: deleteEstadia});

    res.redirect('/');
  }

}
;

