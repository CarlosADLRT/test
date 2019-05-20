import React, {Component} from 'react';
import AddUserComponent from './AddUserComponent';
import {ADD_USER_MODAL, USERS_LIST_MODAL} from '../ModalTypes';
import {bindActionCreators} from 'redux';
import {closeModal, openModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {connect} from 'react-redux';
import UserService from '../../../../Services/UserService';
import {toast} from '../../../../Services/AlertService';

class AddUserContainer extends Component {
    render() {
        return (
            <AddUserComponent
                type={this.props.data.type}
                onClose={() => this.props.closeModal({modal: ADD_USER_MODAL})}
                saveAddUser={this.saveAddUser}
                companyName={this.props.customer.customer_name}
                saveEditUser={this.saveEditUser}
                user={this.props.data.user}/>
        );
    }

    saveEditUser = user_data => {

        const user = {
            _KEY: this.props.data.user._KEY,
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            user_email: user_data.contact_email,
            phone: user_data.phone,
            cellphone: user_data.cellphone,
            skype: user_data.skype
        };
        const user_preferences = {
            _KEY: this.props.data.user.config._KEY,
            user: this.props.data.user.config.user,
            accounting: user_data.accounting,
            auto_buy: user_data.auto_buy,
            claims: user_data.claims,
            ibuyflowers: user_data.ibuyflowers,
            purchase_orders: user_data.purchase_orders,
            standing_orders: user_data.standing_orders
        };

        UserService.addUserAdditionalInfo(user, user_preferences).then(res => {
            if (res.success) {
                this.success('User updated');
            } else {
                this.error(res.error);
            }
        });

    };

    saveAddUser = user_data => {

        const customer = {_KEY: this.props.customer.customer};
        const user = {
            first_name: user_data.first_name,
            last_name: user_data.last_name,
            password: user_data.password,
            user_email: user_data.contact_email
        };
        const user_preferences = {
            accounting: user_data.accounting,
            auto_buy: user_data.auto_buy,
            claims: user_data.claims,
            ibuyflowers: user_data.ibuyflowers,
            purchase_orders: user_data.purchase_orders,
            standing_orders: user_data.standing_orders
        };

        UserService.saveAddUser(customer, false, 'FLORIST', user, user_preferences).then(res => {
            if (res.success) {

                // add additional info of the user, if there is any
                if (user_data.cellphone || user_data.phone || user_data.skype) {
                    const userUpdated = {
                        _KEY: res.data.user.key,
                        cellphone: user_data.cellphone,
                        phone: user_data.phone,
                        skype: user_data.skype
                    };

                    UserService.addUserAdditionalInfo(userUpdated).then(response => {
                        if (response.success) {
                            this.success('User created');
                        } else {
                            this.error(response.error);
                        }
                    });
                } else {
                    this.success('User created');
                }
            } else {
                this.error(res.error);
            }
        });
    };

    success = message => {
        toast(message);
        this.props.closeModal({modal: ADD_USER_MODAL});
        this.props.closeModal({modal: USERS_LIST_MODAL});
        this.props.openModal({modal: USERS_LIST_MODAL});
    };

    error = message => {
        toast(message, 'error');
    };
}

function mapStateToProps(state) {
    const {customer} = state.AuthReducer;
    const {data} = state.ModalReducer.addUserModal;

    return {customer, data};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeModal: closeModal,
        openModal: openModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserContainer);