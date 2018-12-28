import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";

class TopList extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Top List</title>
                </Helmet>
                <div>Top List</div>
            </div>
        );
    }
}

export default withRouter(TopList);
