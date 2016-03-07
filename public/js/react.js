/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 2/9/16
 * Time: 10:41 AM
 */

smoothScroll.init();

var ProductItem = React.createClass({
    handleOpenItem: function(event){
        event.preventDefault();
        this.props.onProductItemOpen(this.props.item.id);
    },
    
    render: function(){
        function createHtmlMarkap(unsafeHTML){
            // TODO: escape html
            return {__html : unsafeHTML}
        }
        return (
            <a href={this.props.item.key} onClick={this.handleOpenItem}>
                <img src={this.props.item.image.preview_url} alt={this.props.item.name}/>
                <div className="item-cover" dangerouslySetInnerHTML={createHtmlMarkap(this.props.item.title)}></div>
            </a>
        )
    }
});

var ProductItemOpen = React.createClass({
    getInitialState: function(){
        return {titleImage: this.props.item.media[0]}
    },

    handleCloseItem: function(event){
        this.props.onProductItemClose();
    },

    handleChangeImage: function(e){
        e.preventDefault();
        this.setState({titleImage: this.props.item.media[e.target.dataset.index]});
    },

    render: function(){
        var self = this;

        var mediaGallery = this.props.item.media.map(function(image, index){
            return (
                <li className={self.state.titleImage.public_id == image.public_id ? "item-image-preview active": "item-image-preview"} key={image.public_id}>
                    <a href="" onClick={self.handleChangeImage}><img src={image.thumb_url} data-index={index} alt=""/></a>
                </li>
            )
        });

        function createHtmlMarkap(unsafeHTML){
            // TODO: escape html
            return {__html : unsafeHTML}
        }

        return (
            <div>
                <div className="item-header">
                    <button onClick={this.handleCloseItem} type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div className="item-body">
                    <h3><a href={this.props.item.key} dangerouslySetInnerHTML={createHtmlMarkap(this.props.item.title)}></a></h3>

                    <div className="row">
                        <div className="item-col-gallery">
                            <div className="item-image">
                                <img src={this.state.titleImage.preview_url} alt={this.props.item.name}/>
                            </div>
                            <ul className="list-inline">
                                {mediaGallery}
                            </ul>
                        </div>
                        <div className="item-col-features">
                            <div className="list-features" dangerouslySetInnerHTML={createHtmlMarkap(this.props.item.props)}></div>
                            <span className="item-price">{this.props.item.price}</span>
                        </div>
                    </div>

                    <div className="item-desc" dangerouslySetInnerHTML={createHtmlMarkap(this.props.item.desc)}></div>
                </div>

            </div>
        )
    }
});

var ProductList = React.createClass({
    loadProductList: function(){
        var self = this;
        $.get('/api/list')
            .done(function(data){
                self.setState({data:data});
            })
            .fail(function(err){
                console.error(err);
            })
    },

    handleItemOpen: function(itemId){
        var list = this.state.data;
        list.forEach(function(item){
            item.isOpen = item.id == itemId;
        });
        this.setState({data: list});
    },


    getInitialState: function(){
        return {data: []}
    },

    componentDidMount: function(){
        this.loadProductList();
    },

    componentDidUpdate: function(){
        $('.cute-grid').isotope({
            itemSelector: '.cute-grid-item',
            layoutMode: 'packery'
        });
    },

    render: function(){
        var self = this;
        var productItems = this.state.data.map(function(item){
            return (
                <div className={item.isOpen? 'cute-grid-item open' : 'cute-grid-item'} key={item.id}>
                    {( item.isOpen
                        ? <ProductItemOpen item={item} onProductItemClose={self.handleItemOpen}></ProductItemOpen>
                        : <ProductItem item={item} onProductItemOpen={self.handleItemOpen}></ProductItem>
                    )}
                </div>
            );
        });

        return (
            <div className="cute-grid">
                {productItems}
            </div>
        )
    }
});

ReactDOM.render(
    <ProductList />,
    document.getElementById('cute-grid')
);