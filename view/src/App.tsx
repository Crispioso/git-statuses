import * as React from "react";
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { RepoStatus, APIStatus, AppState, Filters } from "./utilities/types";
import './app.css';
import './repos.css';
import './grid.css';
import api from "./utilities/api";
import Header from "./components/header/Header";
import Card, { CardDetail, CardStatus } from "./components/card/Card";
import { addRepos, toggleFiltersEditing, toggleIsFetchingAllRepos } from "./state/actions";
import EditFiltersController from "./edit-filters/EditFiltersController";
import applyFilters from "./utilities/filter";
import Mapper from "./utilities/mapper";

interface ReduxProps {
    repos: RepoStatus[],
    isFetchingAllRepos: boolean,
    isEditingFilters: boolean,
    filters: Filters
}

interface DispatchProps {
    addRepos: (repos: RepoStatus[]) => void,
    toggleIsFetchingAllRepos: () => void,
    toggleFiltersEditing: () => void
}

type Props = ReduxProps & DispatchProps;

class App extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {
        this.props.toggleIsFetchingAllRepos();
        const repos: RepoStatus[] = applyFilters(Mapper.responseToState(await api.getStatuses()), this.props.filters);
        this.props.addRepos(repos);
        this.props.toggleIsFetchingAllRepos();
    }

    toggleEditView = () => {
        this.props.toggleFiltersEditing();
    }

    renderCommits(repo: RepoStatus): string {
        if (repo.ahead && repo.ahead > 0) {
            return `Ahead ${repo.ahead} commit${repo.ahead > 1 ? "s" : ""}`
        }
        
        if (repo.behind && repo.behind > 0) {
            return `Behind ${repo.behind} commit${repo.behind > 1 ? "s" : ""}`
        }
    }
    
    renderChanges(repo: RepoStatus): string {
        const parts: string[] = [];

        if (repo.created && repo.created.length > 0) {
            parts.push(`${repo.created.length} file${repo.created.length > 1 ? "s" : ""} created`);
        }
        
        if (repo.modified && repo.modified.length > 0) {
            parts.push(`${repo.modified.length} file${repo.modified.length > 1 ? "s" : ""} modified`);
        }
        
        if (repo.deleted && repo.deleted.length > 0) {
            parts.push(`${repo.deleted.length} file${repo.deleted.length > 1 ? "s" : ""} deleted`);
        }
        
        if (repo.renamed && repo.renamed.length > 0) {
            parts.push(`${repo.renamed.length} file${repo.renamed.length > 1 ? "s" : ""} renamed`);
        }

        return parts.join(" ");
    }

    getRepoStatus(repo: RepoStatus): CardStatus {
        if (repo.ahead) {
            return CardStatus.warning;
        }
        if (repo.behind) {
            return CardStatus.negative;
        }
        return CardStatus.positive;
    }

    getRepoDetails(repo: RepoStatus): CardDetail[] {
        let details: CardDetail[] = [];

        if (repo.behind > 0) {
            details.push({
                label: `Behind ${repo.behind} commit${repo.behind>1 ? "s" : ""}`,
                isAhead: false,
                isBehind: true
            });
        }
        
        if (repo.ahead > 0) {
            details.push({
                label: `Ahead ${repo.ahead} commit${repo.ahead>1 ? "s" : ""}`,
                isAhead: true,
                isBehind: false
            });
        }
        
        if (repo.differentFiles > 0) {
            details.push({
                label: `${repo.differentFiles} uncommitted change${repo.differentFiles > 1 ? "s" : ""}`,
                isAhead: false,
                isBehind: false
            });
        }

        return details;
    }

    renderRepos() {
        if (this.props.repos.length === 0) {
            return <p>No repos to display :(</p>
        }

        return (
            <div className="repos grid-container">
                {this.props.repos.map(repo => {
                    const details: CardDetail[] = this.getRepoDetails(repo);
                    const status: CardStatus = this.getRepoStatus(repo);
                    return (
                        <Card
                            key={repo.name}
                            title={repo.name}
                            subTitle={repo.current}
                            details={details}
                            status={status}
                        />
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.isEditingFilters &&
                    <EditFiltersController />
                }
                <Header onEdit={this.toggleEditView} editIsDisabled={this.props.isFetchingAllRepos}/>
                <main>
                    {this.props.isFetchingAllRepos ? 
                        <p>Loading...</p>
                    :
                        this.renderRepos()
                    }
                </main>
            </div>

        )
    }
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    repos: state.repos,
    isFetchingAllRepos: state.isFetchingAllRepos,
    isEditingFilters: state.isEditingFilters,
    filters: state.filters
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
    addRepos: (repos: RepoStatus[]) => dispatch(addRepos(repos)),
    toggleIsFetchingAllRepos: () => dispatch(toggleIsFetchingAllRepos()),
    toggleFiltersEditing: () => dispatch(toggleFiltersEditing())
});

export default connect<ReduxProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);