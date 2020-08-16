/**
 * AlojamientoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  home: async function (req,res){
    let alojamientos = await Alojamiento.find({}).populate('owner');
    res.view('pages/homepage', {alojamientos: alojamientos});
  },

  newAlojamiento: async function (req,res){
    let nombre = req.param('nombre');
    let capacidad = req.param('capacidad');
    let garage = req.param('garage');
    let direccion = req.param('direccion');
    let imagen = req.param('imagen');

    let alojamientos = await Alojamiento.create({
      nombre: nombre,
      capacidad: capacidad,
      garage: garage,
      direccion: direccion,
      imagenUrl: imagen,
      owner: req.session.user.id
    });

    res.redirect('/');
  }

};

