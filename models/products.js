/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 11/12/15
 * Time: 3:09 PM
 */

var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
    label: 'Cute products',
    autokey: { from: 'name', path: 'key', unique: true },
    sortable: true
});

Product.add({
    name: { type: Types.Text, required: true, index: true },
    title: { type: Types.Html},
    price: { type: Types.Money, format: '$0,0.00' },
    desc: {type: Types.Markdown, required: false, index: false, height: 200},
    props: {type: Types.Markdown, required: false, index: false, height: 200},
    image: {type: Types.CloudinaryImage, select: true},
    media: {type: Types.CloudinaryImages, select: true, sortable: true}
});

Product.register();