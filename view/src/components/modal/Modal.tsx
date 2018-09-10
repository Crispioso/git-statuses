import * as React from "react";
import './modal.css';

interface Props {
    heading: string
}

export default class Modal extends React.Component<Props> {
    componentWillMount() {
        document.querySelector('body').classList.add("overflow-hidden");
    }

    componentWillUnmount() {
        document.querySelector('body').classList.remove("overflow-hidden");
    }

    render() {
        return (
            <div className="modal-container">
                <div className="modal">
                    <h1>{this.props.heading}</h1>
                    <div className="modal__body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}