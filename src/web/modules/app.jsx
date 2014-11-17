var React = require('react');
var Header = require('./header.jsx');
var views = {
	index: require('../views/index.jsx'),
	login: require('../views/login.jsx')
}

var App = React.createClass({
	getInitialState: function() {
		return {
			test: 1
		}
	},
	render: function() {
		var Page = views[this.props._page];
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
				<Header user={this.props.user} />
				<article className="main-article">
					<Page user={this.props.user} />
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