/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 2/19/16
 * Time: 3:02 PM
 */

var keystone = require('keystone');
const Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

    var application = new Enquiry.model(),
        updater = application.getUpdateHandler(req);

    updater.process(req.body, {
        flashErrors: true,
        fields: 'name, email, message',
        errorMessage: 'There was a problem submitting your enquiry:'
    }, function (err) {
        if (err) {
            res.status(501).end(err.errors);
        } else {
            res.send();
        }
    });
};