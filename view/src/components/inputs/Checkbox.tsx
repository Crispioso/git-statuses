import * as React from 'react';
import './checkbox.css';

interface Props {
    id: string,
    label: string,
    checked: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default class Checkbox extends React.Component<Props> {
    render() {
        return (
            <div className="checkbox">
                <input className="checkbox__input" checked={this.props.checked} onChange={this.props.onChange} type="checkbox" id={this.props.id} name={this.props.id}/>
                <label className="checkbox__label" htmlFor={this.props.id}>{this.props.label}</label>
            </div>
        )
    }
}