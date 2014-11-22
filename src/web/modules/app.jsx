var React = require('react');
var Header = require('./header.jsx');
var views = {
	index: require('../views/index.jsx'),
	login: require('../views/login.jsx'),
	register: require('../views/register.jsx')
}

var App = React.createClass({
	getInitialState: function() {
		return {
			loggedIn: !!this.props.user
		}
	},
	logout: function() {
		this.setState({ loggedIn: false });
	},
	render: function() {
		var Page = views[this.props._page.split('.')[0]];
		var json = JSON.stringify(this.props);
		var propStore = (
			<script type="application/json"
				id="props"
				dangerouslySetInnerHTML={{__html: json}}>
			</script>
		);
		return (
			<div>
				{propStore}
				<Header user={this.props.user} loggedIn={this.state.loggedIn} logout={this.logout} />
				<article className="main-article">
					<Page {...this.props} loggedIn={this.state.loggedIn} logout={this.logout} />
				</article>
			</div>
		);
	}
});

if (typeof window !== 'undefined') {
	window.addEventListener('load', function() {
		var container = document.getElementById('react-root');
		var props = JSON.parse(document.getElementById('props').innerHTML);
		React.render(React.createElement(App, props), container);
	});
}

module.exports = App;