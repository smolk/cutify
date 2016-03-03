/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 2/19/16
 * Time: 4:46 PM
 */

var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
    nocreate: true,
    noedit: true
});

Enquiry.add({
    name: { type: Types.Name },
    email: { type: Types.Email },
    //phone: { type: String },
    //enquiryType: { type: Types.Select, options: [
    //    { value: 'message', label: "Just leaving a message" },
    //    { value: 'question', label: "I've got a question" },
    //    { value: 'other', label: "Something else..." }
    //] },
    message: { type: Types.Markdown, required: true },
    createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
    this.wasNew = this.isNew;
    next();
});

Enquiry.schema.post('save', function() {
    if (this.wasNew) {
        this.sendNotificationEmail();
    }
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {

    var enqiury = this;

    keystone.list('User').model.find().exec(function(err, admins) {

        if (err) return callback(err);

        new keystone.Email('enquiry-notification').send({
            to: admins,
            from: {
                name: 'cuti fy',
                email: 'contact@cutify.com'
            },
            subject: 'Message from ' + enqiury.name,
            enquiry: enqiury
        }, callback);

    });

};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, createdAt';
Enquiry.register();