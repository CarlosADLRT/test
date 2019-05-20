import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {closeModal, openModal} from '../../../../Redux/Actions/ModalActionsCreators';

import {ADD_USER_MODAL, USERS_LIST_MODAL} from '../ModalTypes';
import UsersListComponent from './UsersListComponent';
import UserService from '../../../../Services/UserService';
import {question, toast} from '../../../../Services/AlertService';

class UsersListContainer extends Component {

    state = {
        users: []
    };

    componentDidMount() {

        const {customer} = this.props.customer;

        UserService.getUsersList(customer).then(res => {
            this.setState({
                users: res.users
            });
        });
    }

    render() {
        return (
            <UsersListComponent
                onClose={() => this.props.closeModal({modal: USERS_LIST_MODAL})}
                users={this.state.users}
                editUserClick={this.editUserClick}
                deleteUserClick={this.deleteUserClick}/>
        );
    }

    editUserClick = user => {
        this.props.openModal({modal: ADD_USER_MODAL, data: {type: 'edit', user: user}});
    };

    deleteUserClick = user => {
        question('Are your sure?', 'You are about to delete ' + user.first_name + ' ' + user.last_name,
            () => {
                this.deleteUser(user);
            });
    };

    deleteUser = user => {

        const row = {
            _KEY: user._KEY,
            active: false
        };

        UserService.addUserAdditionalInfo(row).then(res => {
            if(res.success){
                toast('User was deleted');
                // update the information in the user list modal
                this.props.closeModal({modal: USERS_LIST_MODAL});
                this.props.openModal({modal: USERS_LIST_MODAL});
            }else{
                toast(res.error, 'error');
            }
        });
    };
}

function mapStateToProps(state) {
    const {customer} = state.AuthReducer;
    return {customer};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeModal: closeModal,
        openModal: openModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);