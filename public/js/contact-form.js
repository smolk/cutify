/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 2/19/16
 * Time: 10:53 AM
 */

var ContactForm = React.createClass({
    getInitialState: function(){
        return {
            email: {value: null, $valid: false, $dirty: false},
            name: {value: null, $valid: false, $dirty: false},
            message: {value: null, $valid: false, $dirty: false},
            isSubmitted: false
        }
    },

    validateForm: function(){
        return this.state.email.$valid && this.state.name.$valid && this.state.message.$valid;
    },

    handleSubmit: function(e, a){
        var self = this;

        e.preventDefault();

        console.log(this.state);
        if (!this.validateForm()) {
            return;
        }

        $.post('/api/contact', {email: self.state.email.value, name: self.state.name.value, message: self.state.message.value})
            .done(function(){
                self.setState({isSubmitted: true});
            })
            .fail(function(){
                console.error('Fail');
            });
    },

    handleFormChange: function(e){
        var state = {};
        state[e.target.id] = {value: e.target.value, $dirty: true, $valid: e.target.value.length > 0};
        this.setState(state);
    },

    validateEmail: function(e){
        var re = /\S+@\S+\.\S+/;
        this.setState({email: {value: e.target.value, $dirty: true, $valid: re.test(e.target.value)} });
    },

    handleCloseMessage: function(e){
        e.preventDefault();
        this.setState(
            {
                email: {value: null, $valid: false, $dirty: false},
                name: {value: null, $valid: false, $dirty: false},
                message: {value: null, $valid: false, $dirty: false},
                isSubmitted: false
            }
        );
    },

    render: function(){
        var self = this;

        if (this.state.isSubmitted) {
            return (
                <div className="alert alert-success">
                    <button onClick={this.handleCloseMessage} type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <p>Thank you for your message</p>
                </div>
            )
        }

        return (
            <form action="" onSubmit={this.handleSubmit}>
                <div className={!self.state.email.$valid && self.state.email.$dirty ? 'form-group has-error' : 'form-group'}>
                    <label htmlFor="email" className="control-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={this.state.email.value} onChange={this.validateEmail} placeholder="Email"/>
                </div>

                <div className={!self.state.name.$valid && self.state.name.$dirty ? 'form-group has-error' : 'form-group'}>
                    <label htmlFor="name" className="control-label">Name</label>
                    <input type="text" className="form-control" id="name" value={this.state.name.value} onChange={this.handleFormChange} placeholder="John Smith"/>
                </div>

                <div className={!self.state.message.$valid && self.state.message.$dirty ? 'form-group has-error' : 'form-group'}>
                    <label htmlFor="message" className="control-label">Message</label>
                    <textarea className="form-control" id="message"  value={this.state.message.value} onChange={this.handleFormChange} placeholder="Type your message here..."></textarea>
                </div>
                <button className="btn btn-default" type="submit">Send message</button>
            </form>
        )
    }
});



ReactDOM.render(
    <ContactForm />,
    document.getElementById('contact-form')
);