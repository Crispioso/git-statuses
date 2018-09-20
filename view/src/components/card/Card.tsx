import * as React from "react";
import './card.css';
import Loader from "../loader/Loader";
import RefreshIcon from "../refresh/RefreshIcon";

interface CardProps {
    title: string,
    subTitle: string,
    details: CardDetail[],
    status: CardStatus,
    isLoading?: boolean,
    onRefresh: (event: React.MouseEvent<HTMLButtonElement>) => void
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
            <div className={`card${this.props.isLoading ? " card--disabled":""}`}>
                <div>
                    <h2 className="card__title">
                        <span>{this.props.title}</span>
                        {/* <span className={`card__status card__status--${this.props.status}`}></span> */}
                    </h2>
                    <button onClick={this.props.onRefresh} type="button" className="card__refresh">
                        <RefreshIcon />
                    </button>
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
                {this.props.isLoading && 
                    <div className="card__loader">
                       <Loader/>
                    </div>
                }
            </div>
        )
    }
}