var React = require('react');

var Header = React.createClass({
	render: function() {
		var user = '';
		if (this.props.loggedIn) {
			user = (
				<p>Welcome, {this.props.user.name}. <a href={null} onClick={this.props.logout}>Logout</a></p>
			);
		}
		return (
			<header className="main-header">
				<h1><img height="200" src="/assets/images/logo-white.png" /></h1>
				{user}
			</header>
		);
	}
});

module.exports = Header;