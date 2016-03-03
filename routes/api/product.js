/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 2/8/16
 * Time: 9:56 AM
 */

var keystone = require('keystone');
const Product = keystone.list('Product');

exports = module.exports = function(req, res) {
    Product.model.findOne({
        key: req.params.key
        })
        .exec()
        .then(function(p){
            var result = {
                name: p.name,
                image: {
                    public_id: p.image.public_id,
                    url: p.image.url,
                    //preview_url: p.image.fill(200,200)
                    //thumb_url: p.image.fill(100,100)
                },
                media: []
            };

            for (var i=0; i < p.media.length; i++){
                var img = p.media[i];

                result.media.push({
                    public_id: img.public_id,
                    url: img.url,
                    preview_url: img.fill(200,200),
                    thumb_url: img.fill(100,100)
                });
            }
            res.send(result);

        }, function(err){
            console.error(err);
            res.status(500).send('Ops');
        });
};