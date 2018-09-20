import * as React from "react";
import './header.css';

interface Props {
    onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void,
    editIsDisabled?: boolean
}

export default class Header extends React.Component<Props> {
    render() {
        return (
            <header className="header">
                <h1 className="header__title">Git repo status</h1>
                <button disabled={this.props.editIsDisabled} className="header__action" onClick={this.props.onEdit}>Filter</button>
            </header>
        )
    }
}