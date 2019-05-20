import React, {Component} from 'react';
import ModalComponent from '../ModalComponent';
import './ManageGrowersComponent.scss';

class ManageGrowersComponent extends Component {

    defaultState = {
        filterGrower: '',
        filterCountry: '',
        filterStatus: ''
    };

    state = this.defaultState;

    render() {
        const relations = this.filterTable(this.props.relations);

        return (
            <ModalComponent
                size="lg"
                title={'Manage growers\n'}
                onClose={this.props.onClose}
                footerEnabled={false}
                className={'manage-growers-dialog'}
                body={
                    <div className="info-content mb-3">

                        {this.getFiltersHeader(this.props.relations)}

                        <div className="card">
                            <table className="table table-bordered m-0">
                                <thead>
                                <tr>
                                    <th>Grower</th>
                                    <th>Country</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    relations.map(item => {
                                        const {company_name, country, city} = item.grower;
                                        return (
                                            <tr>
                                                <td>
                                                    <b>{company_name}</b>
                                                </td>
                                                <td>
                                                    <img className="country_flag"
                                                         src={`Assets/Images/${country.country_iso}_flag.svg`} alt=""/>
                                                    {country.country} - {city}
                                                </td>
                                                <td>
                                                    <span>{item.blocked ? 'Blocked' : 'Active'}</span>
                                                </td>

                                                {this.getButtonAction(item)}
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }>
            </ModalComponent>
        );
    }

    getFiltersHeader = source => {
        return (
            <div className="action-panel row">
                <div className="col-3">
                    <div className="form-group">
                        <label>Grower</label>
                        <input className="form-control input-sm"
                               type="text"
                               onChange={this.handleGrower}
                               value={this.state.filterGrower}/>
                    </div>
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label>Country</label>
                        <select className="form-control input-sm"
                                onChange={this.handleCountry}
                                value={this.state.filterCountry}>

                            <option value="">All Countries</option>
                            {
                                this.getCountryList(source).map(item => {
                                    return (
                                        <option value={item._KEY}>
                                            {item.countryLabel}
                                        </option>
                                    );
                                })
                            }

                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control input-sm"
                                onChange={this.handleStatus}
                                value={this.state.filterStatus}>
                            <option value="">All</option>
                            <option value={true}>Blocked</option>
                            <option value={false}>Active</option>
                        </select>
                    </div>
                </div>

                <div className="col-3 align-self-center pt-0 pt-md-2">
                    <button className="btn btn-sm btn-primary"
                            onClick={this.resetFiltersHandler}>
                        <i className="fa fa-fw fa-undo"/> Reset filter
                    </button>
                </div>
            </div>
        );
    };

    getButtonAction = relation => {

        if (relation.blocked) {
            return (
                <td className="text-center">
                    <button className="btn btn-success btn-sm w-50" type="button"
                            onClick={() => this.props.handleButtonAction(relation)}>
                        <i aria-hidden="true" className="fa fa-check"/> Activate
                    </button>
                </td>
            );
        } else {
            return (
                <td className="text-center">
                    <button className="btn btn-danger btn-sm w-50" type="button"
                            onClick={() => this.props.handleButtonAction(relation)}>
                        <i aria-hidden="true" className="fa fa-times"/> Block
                    </button>
                </td>
            );
        }
    };

    getCountryList = relations => {
        let keys = [];
        let countryList = [];

        relations.forEach(item => {
            const {country, country_iso, _KEY} = item.grower.country;

            let countryLabel = country + ' (' + country_iso + ')';

            if (!keys.includes(_KEY)) {
                countryList.push({countryLabel: countryLabel, _KEY: _KEY});
                keys.push(_KEY);
            }
        });

        return countryList;
    };

    filterTable = relations => {
        let response = [];

        relations.forEach(item => {
            if (this.shouldAddIt(item, this.state)) {
                response.push(item);
            }
        });

        return response;
    };

    shouldAddIt = (relation, filterParams) => {
        let condition1 = false;
        let condition2 = false;
        let condition3 = false;

        if (filterParams.filterGrower) {
            if (relation.grower.company_name.includes(filterParams.filterGrower)) {
                condition1 = true;
            }
        } else {
            condition1 = true;
        }

        if (filterParams.filterCountry) {
            if (filterParams.filterCountry === relation.grower.country._KEY) {
                condition2 = true;
            }
        } else {
            condition2 = true;
        }

        if (filterParams.filterStatus) {
            if (filterParams.filterStatus === relation.blocked.toString()) {
                condition3 = true;
            }
        } else {
            condition3 = true;
        }

        return condition1 && condition2 && condition3;
    };

    handleGrower = event => {
        this.setState({filterGrower: event.target.value});
    };

    handleCountry = event => {
        this.setState({filterCountry: event.target.value});
    };

    handleStatus = event => {
        this.setState({filterStatus: event.target.value});
    };

    resetFiltersHandler = () => {
        this.setState(this.defaultState);
    };
}

export default ManageGrowersComponent;
