var React = require('react');

module.exports = React.createClass({
	render: function() {
		var login = '';
		if (!this.props.user) {
			login = <p><a href="/login">Login</a></p>;
		}
		return (
			<div>
				<p>Home</p>
				{login}
			</div>
		);
	}
});