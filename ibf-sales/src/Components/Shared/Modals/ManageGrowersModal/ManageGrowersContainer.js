import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';

import {MANAGE_GROWERS_MODAL} from '../ModalTypes';
import SharedService from '../../../../Services/SharedService';
import ManageGrowersComponent from './ManageGrowersComponent';
import {toast} from '../../../../Services/AlertService';

type state = {
    relations: any
}

class ManageGrowersContainer extends Component<{}, state> {

    state = {
        relations: []
    };

    componentDidMount() {
        this.getCustomerGrowerRelationships();
    }

    render() {
        const {relations} = this.state;
        return (
            <ManageGrowersComponent
                onClose={() => this.props.closeModal({modal: MANAGE_GROWERS_MODAL})}
                relations={relations}
                handleButtonAction={this.handleButtonAction}/>
        );
    }

    handleButtonAction = relation => {
        let action = relation.blocked ? 'allow' : 'block';
        SharedService.changeCustomerGrowerRelationship(action, this.props.customer.customer, relation.grower._KEY, 'customer')
            .then(() => {
                // update list
                this.getCustomerGrowerRelationships();

                // visual feedback
                let message = relation.grower.company_name + ' has been ';
                message += relation.blocked ? 'activated' : 'blocked';
                toast(message);
            });
    };

    getCustomerGrowerRelationships = () => {
        SharedService.getCustomerGrower(this.props.customer.customer, 'customer').then(res => {
            this.setState({
                relations: res.relations
            });
        });
    };
}

function mapStateToProps(state) {
    const {customer} = state.AuthReducer;
    return {customer};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeModal: closeModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGrowersContainer);
