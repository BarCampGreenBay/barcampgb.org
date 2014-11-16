var React = require('react');
var Header = require('./header.jsx');
var Page;

var App = React.createClass({
	getInitialState: function() {
		return {
			test: 1
		}
	},
	render: function() {
		if (this.props.url === '/react/page2') {
			Page = require('./page2.jsx');
		}
		else {
			Page = require('./pageHome.jsx');
		}
		return (
			<div>
				<Header />
				<Page />
			</div>
		);
	}
});

module.exports = App;