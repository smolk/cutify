/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/12/15
 * Time: 12:17 PM
 */
var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(done) {

    new User.model({
        name: { first: 'Yaroslav', last: 'S' },
        email: 'yark.smolk@gmail.com',
        password: 'admin',
        canAccessKeystone: true
    }).save(done);

};
