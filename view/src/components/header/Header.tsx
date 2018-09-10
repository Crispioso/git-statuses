import * as React from "react";
import './header.css';

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <h1 className="header__title">Git repo status</h1>
            </header>
        )
    }
}