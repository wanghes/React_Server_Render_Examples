import React from "react";
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
// import { push } from 'connected-react-router';
import { fetchUserList } from '../actions';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
        this.jumpDetail = this.jumpDetail.bind(this);
    }


    static fetch(store){
        return store.dispatch(fetchUserList())
    }

    componentWillMount() {
        const { users } = this.props;
        if(users.list.length === 0){
            this.props.fetchUserList();
        } else {
            this.setState({
                list: this.props.users.list
            });
        }
    }

    componentDidMount() {
        //console.log(this.props);
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.users == this.props.users){
            return false
        }
        return true;
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.users.list.length) {
            this.setState({
                list: nextProps.users.list
            });
        }
    }

    jumpDetail(id) {
        console.log(id);
        //this.props.push('/top-list')
    }

    render() {
        const { list } = this.state;

        return (
            <div>
                <Helmet>
                    <title>Bar</title>
                </Helmet>
                <div className="view_list">
                    {
                        list.map((item)=>{
                            return (
                                <div className="item" key={ item.id } onClick={ () => this.jumpDetail(item.id) }>
                                    <span>{ item.userName }</span>
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
    // pathname: state.router.location.pathname,
    // search: state.router.location.search,
    // hash: state.router.location.hash,
    users: state.users
});;

const mapDispatchToProps = {
    fetchUserList,
    //push
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bar));
