import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import Modal from '../components/modal/Modal';
import Checkbox from '../components/inputs/Checkbox';
import { AppState, Filters, RepoStatus } from '../utilities/types';
import { toggleFiltersEditing, toggleShowBehindFilter, toggleIsFetchingAllRepos, addRepos, toggleShowAheadFilter, toggleShowCleanFilter, toggleShowUncommittedChangesFilter } from '../state/actions';
import applyFilters from '../utilities/filter';
import Mapper from '../utilities/mapper';
import api from '../utilities/api';

interface ReduxProps {
    isEditingFilters: boolean,
    filters: Filters
}

interface DispatchProps {
    addRepos: (repos: RepoStatus[]) => void
    toggleFiltersEditing: () => void,
    toggleShowBehindFilter: () => void,
    toggleShowAheadFilter: () => void,
    toggleShowCleanFilter: () => void,
    toggleShowUncommittedChangesFilter: () => void,
    toggleIsFetchingAllRepos: () => void
}

type Props = ReduxProps & DispatchProps;

interface State {
    showBehind?: boolean,
    showAhead?: boolean,
    showClean?: boolean,
    showReposWithUncommittedChanges?: boolean,
}

class EditFiltersController extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showBehind: undefined,
            showAhead: undefined,
            showClean: undefined,
            showReposWithUncommittedChanges: undefined
        }
    }

    updateStateWithNewRepos = async (filters: Filters) => {
        this.props.toggleIsFetchingAllRepos();
        const repos: RepoStatus[] = applyFilters(Mapper.responseToState(await api.getStatuses()), filters);
        this.props.addRepos(repos);
        this.props.toggleIsFetchingAllRepos();
    }

    handleClose = () => {
        this.props.toggleFiltersEditing();
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let filters: Filters = {...this.props.filters};

        if (this.state.showBehind !== undefined && this.state.showBehind !== this.props.filters.showBehindRepos) {
            filters.showBehindRepos = this.state.showBehind;
            this.props.toggleShowBehindFilter();
        }
        
        if (this.state.showAhead !== undefined && this.state.showAhead !== this.props.filters.showAheadRepos) {
            filters.showAheadRepos = this.state.showAhead;
            this.props.toggleShowAheadFilter();
        }
        
        if (this.state.showClean !== undefined && this.state.showClean !== this.props.filters.showCleanRepos) {
            filters.showCleanRepos = this.state.showClean;
            this.props.toggleShowCleanFilter();
        }
        
        if (this.state.showReposWithUncommittedChanges !== undefined && this.state.showReposWithUncommittedChanges !== this.props.filters.showReposWithUncommittedChanges) {
            filters.showReposWithUncommittedChanges = this.state.showReposWithUncommittedChanges;
            this.props.toggleShowUncommittedChangesFilter();
        }

        this.props.toggleFiltersEditing();
        this.updateStateWithNewRepos(filters);
    }

    handleCheckboxChange = (stateProperty: string, event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [stateProperty]: event.target.checked
        });
    }

    render() {
        return (
            <Modal heading="Apply filters">
                <form onSubmit={this.handleSubmit}>
                    <Checkbox 
                        id="show-behind-repos"
                        label="Show 'behind' repos"
                        key="show-behind-repos"
                        checked={this.state.showBehind !== undefined ? this.state.showBehind : this.props.filters.showBehindRepos}
                        onChange={event => this.handleCheckboxChange("showBehind", event)}
                    />
                    <Checkbox 
                        id="show-ahead-repos"
                        label="Show 'ahead' repos"
                        key="show-ahead-repos"
                        checked={this.state.showAhead !== undefined ? this.state.showAhead : this.props.filters.showAheadRepos}
                        onChange={event => this.handleCheckboxChange("showAhead", event)}
                    />
                    <Checkbox 
                        id="show-clean-repos"
                        label="Show up-to-date repos with no changes"
                        key="show-clean-repos"
                        checked={this.state.showClean !== undefined ? this.state.showClean : this.props.filters.showCleanRepos}
                        onChange={event => this.handleCheckboxChange("showClean", event)}
                    />
                    <Checkbox 
                        id="show-uncommitted-changes-repos"
                        label="Show repos with uncommitted changes"
                        key="show-uncommitted-changes-repos"
                        checked={this.state.showReposWithUncommittedChanges !== undefined ? this.state.showReposWithUncommittedChanges : this.props.filters.showReposWithUncommittedChanges}
                        onChange={event => this.handleCheckboxChange("showReposWithUncommittedChanges", event)}
                    />
                    <div className="overflow-hidden">
                        <button className="btn float-right" type="submit">Apply</button>
                        <button className="btn float-right" type="button" onClick={this.handleClose}>Close</button>
                    </div>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = (state: AppState): ReduxProps => ({
    isEditingFilters: state.isEditingFilters,
    filters: state.filters
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
    addRepos: (repos: RepoStatus[]) => dispatch(addRepos(repos)),
    toggleFiltersEditing: () => dispatch(toggleFiltersEditing()),
    toggleShowBehindFilter: () => dispatch(toggleShowBehindFilter()),
    toggleShowAheadFilter: () => dispatch(toggleShowAheadFilter()),
    toggleShowCleanFilter: () => dispatch(toggleShowCleanFilter()),
    toggleShowUncommittedChangesFilter: () => dispatch(toggleShowUncommittedChangesFilter()),
    toggleIsFetchingAllRepos: () => dispatch(toggleIsFetchingAllRepos())
});

export default connect<ReduxProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(EditFiltersController);