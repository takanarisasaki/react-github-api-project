var React = require('react');
var Link = require('react-router').Link;

var GithubUser = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired,
    },
    render: function() {
        //console.log(this.props.user.login);
        return (
            <Link className="all_avatar_link" to={'/user/' + this.props.user.login}>
                <img className="avatar_url" src={this.props.user.avatar_url}/>
                <p className="followers_username"> {this.props.user.login} </p>
            </Link>

        );
    }
    
    
});

module.exports = GithubUser;