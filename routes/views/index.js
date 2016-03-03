/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/12/15
 * Time: 11:22 AM
 */

var keystone = require('keystone');
var _ = require('underscore');
const Product = keystone.list('Product');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    //var locals = res.locals;

    //view.on('init', function(next){
    //    Product.model.find()
    //        .exec()
    //        .then(function(list){
    //            locals.products  = list;
    //            next();
    //        }, function(err){
    //            console.error(err);
    //        });
    //});

    view.render('index', {section: 'home'});

};
