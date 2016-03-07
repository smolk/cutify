/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/12/15
 * Time: 10:45 AM
 */

var keystone = require('keystone');

require('./config');
require('./models');

keystone.set('routes', require('./routes'));

keystone.start();