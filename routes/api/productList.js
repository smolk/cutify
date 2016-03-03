/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 2/9/16
 * Time: 11:20 AM
 */

var keystone = require('keystone');
const Product = keystone.list('Product');

function getMedia(aMedia){
    var result = [];

    for (var i=0; i < aMedia.length; i++){
        var img = aMedia[i];
        result.push({
            public_id: img.public_id,
            url: img.url,
            preview_url: img.fill(265,265),
            thumb_url: img.fill(55,55)
        });
    }

    return result;
}

exports = module.exports = function(req, res) {
    Product.model.find()
        .sort({ sortOrder: 1 })
        .exec()
        .then(function(list){
            var result = [];

            for (var i=0; i < list.length; i++){
                var item = list[i];

                result.push({
                    id: item.id,
                    sortOrder: item.sortOrder,
                    name: item.name,
                    title: item.title,
                    price: item._.price.format('$0.00'),
                    key: item.key,
                    isOpen: false,
                    image: {
                        public_id: item.image.public_id,
                        url: item.image.url,
                        preview_url: item._.image.fill(350,350)
                    },
                    desc: item.desc.html,
                    props: item.props.html,
                    media: getMedia(item.media)
                });
            }
            res.send(result);
        }, function(err){
            console.error(err);
            res.status(500).send('Ops');
        });
};