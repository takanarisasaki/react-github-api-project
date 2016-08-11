var React = require('react');
var $ = require('jquery');
var GithubRepo = require('./GithubRepo');

var Repositories = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            repositories: []
        };
    },
    componentDidMount: function() {
        var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=7caefdbff045f5059b46e65eb5a51f1c96873312&page=${this.state.page}&per_page=50`;
        var that = this;
        //console.log('COMES IN HERE');
        
        this.setState({
            loading: true
        });
        
        $.getJSON(url).then(function(repositories) {
            //console.log("REPOSITORIES1", repositories)
            that.setState({
                repositories: that.state.repositories.concat(repositories),
                loading: true,
                page: that.state.page + 1
            });
        });
    },
    render: function() {
        //console.log("REPOSITORIES2:", this.state.repositories)
        // if (!this.state.repositories) {
        //     return <div>LOADING REPOSITORIES...</div>
        // }
        
        return (
            <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer={true} elementHeight={50} infiniteLoadBeginEdgeOffset={100}>
                <div className="repository-page">
                    <h2>Repositories of {this.props.params.username}</h2>
                    <ul>
                        {this.state.repositories.map(function(repository) {
                            //console.log("USER login", eachUser.login);
                            return <GithubRepo repositories={repository} key={repository.id} />
                        })}
                    </ul>
                </div>
            </Infinite>
        );
        

    }
});

module.exports = Repositories;