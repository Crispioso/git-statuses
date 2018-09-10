import * as React from "react";
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { RepoStatus, APIStatus, AppState } from "./utilities/types";
import './app.css';
import './repos.css';
import './grid.css';
import api from "./utilities/api";
import Header from "./components/header/Header";
import Card, { CardDetail, CardStatus } from "./components/card/Card";
import { addRepos } from "./state/actions";

interface ReduxProps {
    repos: RepoStatus[]
}

interface DispatchProps {
    addRepos: (repos: RepoStatus[]) => void
}

type Props = ReduxProps & DispatchProps;

interface State {
    isFetchingRepos: boolean
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isFetchingRepos: false
        }
    }

    async componentDidMount() {
        this.setState({isFetchingRepos: true});
        const repos: RepoStatus[] = this.mapResponseToState(await api.getStatuses());
        this.props.addRepos(repos);
        this.setState({isFetchingRepos: false});
    }

    mapResponseToState(response: APIStatus[]): RepoStatus[] {
        return response.map((status: APIStatus): RepoStatus => ({
            name: status.name,
            ahead: status.ahead,
            behind: status.behind,
            current: status.current,
            created: status.created,
            deleted: status.deleted,
            modified: status.modified,
            differentFiles: status.files.length,
            renamed: status.renamed,
            staged: status.staged
        }));
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
                <Header/>
                <main>
                    {this.state.isFetchingRepos ? 
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
    repos: state.repos
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
    addRepos: (repos: RepoStatus[]) => dispatch(addRepos(repos))
});

export default connect<ReduxProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);