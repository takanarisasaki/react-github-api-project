var React = require('react');
var $ = require('jquery');
var GithubUser = require('./GithubUser');
var Infinite = require('react-infinite');

var Followers = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            followers: []
        };
    },
    fetchData: function() {
        var url =  `https://api.github.com/users/${this.props.params.username}/followers?access_token=7caefdbff045f5059b46e65eb5a51f1c96873312&page=${this.state.page}&per_page=50`
        //console.log('URL', url);
        
        this.setState({
            loading: true
        });
        
        var that = this;
        
        $.getJSON(url).then(function(followers) {
            //console.log("FOLLOWERS AAA", followers);
            that.setState({
                followers: that.state.followers.concat(followers),
                loading: false,
                page: that.state.page + 1
            });
        });
        
    },
    elementInfiniteLoad: function() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },
    render: function() {
        //console.log("FOLLOWERS", this.state.followers);
        // console.log("LOADING", this.state.loading);
        // console.log("PAGE", this.state.page);
        
        // if (!this.state.followers) {
        //     return <div>LOADING FOLLOWERS...</div>
        // }
        return (
            <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer={true} elementHeight={50} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING</div>}>
            
                <div className="followers-page">
                    <h2>Followers of {this.props.params.username}</h2>
                    <ul>
                        {this.state.followers.map(function(eachUser) {
                            //console.log("USER login", eachUser.login);
                            return <GithubUser user={eachUser} key={eachUser.id} />
                        })}
                    </ul>
                </div>
            </Infinite>
        );
    }
});

module.exports = Followers;