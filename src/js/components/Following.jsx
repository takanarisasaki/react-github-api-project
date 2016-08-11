var React = require('react');
var $ = require('jquery');
var GithubUser = require('./GithubUser');

var Following = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=7caefdbff045f5059b46e65eb5a51f1c96873312`;
        var that = this;
        $.getJSON(url).then(function(followingUsers) {
            that.setState({
                following: followingUsers
            });
        });
    },
    render: function() {
        if (!this.state.following) {
            return <div>LOADING FOLLOWINGS...</div>
        }
        
        return (
            <div className="following-page">
                <h2>Following of {this.props.params.username}</h2>
                <ul>
                    {this.state.following.map(function(eachUser) {
                        //console.log("USER login", eachUser.login);
                        return <GithubUser user={eachUser} key={eachUser.id} />
                    })}
                </ul>
            </div>
        );

    }
});

module.exports = Following;
