var React = require('react');
var $ = require('jquery');
var GithubRepo = require('./GithubRepo');

var Repositories = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=7caefdbff045f5059b46e65eb5a51f1c96873312`;
        var that = this;
        //console.log('COMES IN HERE')
        $.getJSON(url).then(function(repositories) {
            //console.log("REPOSITORIES1", repositories)
            that.setState({
                repositories: repositories
            });
        });
    },
    render: function() {
        //console.log("REPOSITORIES2:", this.state.repositories)
        if (!this.state.repositories) {
            return <div>LOADING REPOSITORIES...</div>
        }
        
        return (
            <div className="repository-page">
                <h2>Repositories of {this.props.params.username}</h2>
                <ul>
                    {this.state.repositories.map(function(repository) {
                        //console.log("USER login", eachUser.login);
                        return <GithubRepo repositories={repository} key={repository.id} />
                    })}
                </ul>
            </div>
        );

    }
});

module.exports = Repositories;