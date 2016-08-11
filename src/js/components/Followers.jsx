var React = require('react');
var $ = require('jquery');
var GithubUser = require('./GithubUser');

var Followers = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var url =  `https://api.github.com/users/${this.props.params.username}/followers?access_token=7caefdbff045f5059b46e65eb5a51f1c96873312`
        //console.log('URL', url)
        var that = this;

        $.getJSON(url).then(function(followers) {
            //console.log("FOLLOWERS", followers);
            //console.log('comes in here');
            that.setState({
                followers: followers
            });
        });
        
    },
    render: function() {
        if (!this.state.followers) {
            return <div>LOADING FOLLOWERS...</div>
        }
        return (
            <div className="followers-page">
                <h2>Followers of {this.props.params.username}</h2>
                <ul>
                    {this.state.followers.map(function(eachUser) {
                        //console.log("USER login", eachUser.login);
                        return <GithubUser user={eachUser} key={eachUser.id} />
                    })}
                </ul>
            </div>
        );
    }
});

module.exports = Followers;