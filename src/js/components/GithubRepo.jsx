var React = require('react');
var Link = require('react-router').Link;

var GithubRepo = React.createClass({
    propTypes: {
        repositories: React.PropTypes.object.isRequired
    },
    render: function() {
        //console.log('comes in here');
        //console.log(this.props.repositories);
        return (
                <a className="repository_link" href={this.props.repositories.html_url}> 
                    <div className="repository_login"> {this.props.repositories.owner.login}/{this.props.repositories.name} </div>
                    <div className="num_stars"> {this.props.repositories.stargazers_count}&#9733; </div>
                </a>
        );
    }
    
    
});

module.exports = GithubRepo;