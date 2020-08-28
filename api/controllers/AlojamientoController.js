/**
 * AlojamientoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  home: async function (req, res) {
    let alojamientos = await Alojamiento.find({owner: {'!=': null}}).populate('owner');
    await Alojamiento.destroy({owner: null});
    res.view('pages/homepage', {alojamientos: alojamientos});
  },

  newAlojamiento: async function (req, res) {
    let name = req.param('nombre');
    let capacity = req.param('capacidad');
    let garage = req.param('garage');
    let address = req.param('direccion');
    let image = req.file('imagen').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
      maxBytes: 10000000
    }, async function (err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }

      let nombreArchivo = 'default.png';

      if(uploadedFiles !== undefined) {
        nombreArchivo = uploadedFiles[0].fd.split('/');
        nombreArchivo = nombreArchivo[nombreArchivo.length - 1];
      }
      let alojamientos = await Alojamiento.create({
        name: name,
        capacity: capacity,
        garage: garage,
        address: address,
        image: nombreArchivo,
        owner: req.session.user.id
      });

      res.redirect('/');
    });


  },

  newAlojamientoInvisible: function (req, res) {
    res.view('pages/newAlojamiento');
  },

  deleteAlojamiento: async function (req, res) {
    await Alojamiento.destroy({id: req.param('id')});

    res.redirect('/');
  }
};

