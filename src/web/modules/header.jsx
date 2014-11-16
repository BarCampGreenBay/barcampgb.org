var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<header className="main-header">
				<h1><img height="200" src="/assets/images/logo-white.png" /></h1>
			</header>
		);
	}
});

module.exports = Header;