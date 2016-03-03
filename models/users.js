/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/12/15
 * Time: 10:57 AM
 */

var keystone = require('keystone'),
    Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true },
    canAccessKeystone: { type: Boolean, initial: true }
});

User.register();