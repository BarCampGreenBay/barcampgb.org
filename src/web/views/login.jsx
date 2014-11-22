var React = require('react');

var LoginPage = React.createClass({
	displayName: 'LoginPage',
	render: function () {
		return (
			<form className="form" method="post">
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
				<p>
					<a href="/forgot-password">Forgot Password</a>
				</p>
				<div className="form-field">
					<button type="submit">
						Login
					</button>
				</div>
			</form>
		);
	}
});

module.exports = LoginPage;