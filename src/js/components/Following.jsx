var React = require('react');
var $ = require('jquery');
var GithubUser = require('./GithubUser');
var Infinite = require('react-infinite');

var Following = React.createClass({
    getInitialState: function() {
        return {
            page: 1,
            loading: false,
            following: []
        };
    },
    fetchData: function() {
        var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=7caefdbff045f5059b46e65eb5a51f1c96873312&page=${this.state.page}&per_page=50`;
        
        this.setState({
            loading: true
        });
        
        var that = this;
        $.getJSON(url).then(function(followingUsers) {
            that.setState({
                following: that.state.following.concat(followingUsers),
                loading: false,
                page: that.state.page + 1
            });
        });
    },
    render: function() {
        // if (!this.state.following) {
        //     return <div>LOADING FOLLOWINGS...</div>
        // }
        
        return (
            <Infinite isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer={true} elementHeight={50} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING</div>}>
                <div className="following-page">
                    <h2>Following of {this.props.params.username}</h2>
                    <ul>
                        {this.state.following.map(function(eachUser) {
                            //console.log("USER login", eachUser.login);
                            return <GithubUser user={eachUser} key={eachUser.id} />
                        })}
                    </ul>
                </div>
            </Infinite>
        );

    }
});

module.exports = Following;
