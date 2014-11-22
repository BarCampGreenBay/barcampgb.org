var React = require('react');

var RegisterPage = React.createClass({
	displayName: 'RegisterPage',
	render: function () {
		var createShirtOption = function(size) {
			return (<option key={size} value={size}>{size}</option>);
		};
		var form = <input type="hidden" name="existingUser" value="yes" />;
		if (this.props.user) {
			form = (
				<div>
					<div className="form-field">
						<label className="field-label" htmlFor="login-name">
							Name:
						</label>
						<input className="field-control" type="text" id="login-name" name="name" />
					</div>
					<div className="form-field">
						<label className="field-label" htmlFor="login-email">
							Email:
						</label>
						<input className="field-control" type="text" id="login-email" name="email" />
					</div>
					<div className="form-field">
						<label className="field-label" htmlFor="login-password">
							Password:
						</label>
						<input className="field-control" type="password" id="login-password" name="password" />
					</div>
					<div className="form-field">
						<label className="field-label" htmlFor="register-shirt-size">
							T-shirt size:
						</label>
						<select className="field-control" id="register-shirt-size" name="shirtSize">
							<option value="">Select...</option>
							{this.props.shirtSizes.map(createShirtOption)}
						</select>
					</div>
				</div>
			);
		}
		return (
			<div>
				<p>Register for {this.props.eventName}</p>
				<form className="form" method="post">
					{form}
					<input type="hidden" name="event" value={this.props.event._id} />
					<div className="form-field">
						<button type="submit">
							Register
						</button>
					</div>
				</form>
			</div>
		);
	}
});

module.exports = RegisterPage;