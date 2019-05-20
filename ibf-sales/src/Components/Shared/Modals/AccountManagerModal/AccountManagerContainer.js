import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeModal} from "../../../../Redux/Actions/ModalActionsCreators";
import AccountManagerComponent from './AccountManagerComponent';

import {ACCOUNT_MANAGER_MODAL} from '../ModalTypes';
import SharedService from '../../../../Services/SharedService';
import {toast} from '../../../../Services/AlertService';

type state = {
    managerName: string,
    managerPhone: string,
    managerEmail: string
}

class AccountManagerContainer extends Component<{}, state>{

    state = {
        managerName: '',
        managerPhone: '',
        managerEmail: ''
    };

    componentDidMount(){
        SharedService.getManagerInfo(this.props.customer.account_manager).then(res => {
            if(res.success){
                this.setState({
                    managerName: res.box.name,
                    managerPhone: res.box.phone,
                    managerEmail: res.box.email
                });
            }else{
                toast(res.error, 'error');
            }
        })
    }

    render(){
        const {managerName, managerPhone, managerEmail} = this.state;
        return (
            <AccountManagerComponent
                onClose = {() => this.props.closeModal({modal: ACCOUNT_MANAGER_MODAL})}
                managerName={managerName}
                managerPhone={managerPhone}
                managerEmail={managerEmail}/>
        );
    }
}

function mapStateToProps(state){
    const {customer} = state.AuthReducer;
    return {customer};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeModal: closeModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagerContainer);
