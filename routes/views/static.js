/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/12/15
 * Time: 1:15 PM
 * with Love for Globesoft
 */


var keystone = require('keystone');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = 'static';

    view.render('static', {title: 'From View model'});
};