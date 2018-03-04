import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>this a Home page</div>
        )
    }
}

class Other extends Component {
    render() {
        return (
            <div>this a Other page</div>
        )
    }
}

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '/hi'
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/home">首页</Link></li>
                        <li><Link to="/other">其他页</Link></li>
                    </ul>
                    <Route path="/home" component={Home}/>
                    <Route path="/other" component={Other}/>
                </div>
            </Router>
        )
    }

    componentDidMount() {
        console.log(this.state.path);
    }

    componentDidUpdate() {
        console.log(this.state.path);
    }
}

export default AppRouter;