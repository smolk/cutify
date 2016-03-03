/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/13/15
 * Time: 10:38 AM
 */

var keystone = require('keystone');
const Product = keystone.list('Product');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = 'works';

    view.on('init', function(next){
        Product.model.findOne({
            key: req.params.key
        })
            .exec()
            .then(function(p){
                console.log(p);
                locals.product  = p;
                next();
            }, function(err){
                console.error(err);
            });
    });

    view.render('product');
};
