import * as React from "react";
import './card.css';

interface CardProps {
    title: string,
    subTitle: string,
    details: CardDetail[],
    status: CardStatus
}

export enum CardStatus {
    positive = "positive",
    neutral = "neutral",
    warning = "warning",
    negative = "negative"
}

export interface CardDetail {
    isAhead: boolean,
    isBehind: boolean,
    label: string
}

export default class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div>
                    <h2 className="card__title">
                        <span>{this.props.title}</span>
                        <span className={`card__status card__status--${this.props.status}`}></span>
                    </h2>
                    <p className="card__subtitle">{this.props.subTitle}</p>
                </div>
                <div>
                    <ul className="card__details">
                        {this.props.details.map(detail => (
                            <li key={detail.label} className={`card__detail ${detail.isAhead ? " card__detail--positive" : ""} ${detail.isBehind ? " card__detail--negative" : ""}`}>
                                {detail.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}