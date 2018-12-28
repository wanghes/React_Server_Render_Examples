import React from "react";
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { fetchPostList } from '../actions';

class Baz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        }
    }
    static fetch(store){
        return store.dispatch(fetchPostList())
    }

    componentWillMount() {
        const { post } = this.props;
        if(post.list.length === 0){
            this.props.fetchPostList();
        } else {
            this.setState({
                list: this.props.post.list
            });
        }
    }

    componentDidMount(){
        //this.props.fetchPostList();
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.post == this.props.post){
            return false
        }
        return true;
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.post.list.length) {
            this.setState({
                list: nextProps.post.list
            });
        }
    }
    render() {
        const { list } = this.state;
        return (
            <div>
                <Helmet>
                    <title>Baz</title>
                </Helmet>
                <div className="view_list">
                    {
                        list.map((item)=>{
                            return (
                                <div className="item" key={ item.id }>
                                <span>{ item.title }</span>
                                <em>{ item.createdAt }</em>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    post: state.post
});

const mapDispatchToProps = {
    fetchPostList
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Baz));
