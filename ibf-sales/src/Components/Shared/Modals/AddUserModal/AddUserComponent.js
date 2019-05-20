import React, {Component} from 'react';
import ModalComponent from '../ModalComponent';
import {toast} from '../../../../Services/AlertService';

class AddUserComponent extends Component {

    state = {
        first_name: '',
        last_name: '',
        phone: '',
        cellphone: '',
        skype: '',
        company_name: '',
        contact_email: '',
        confirm_contact_email: '',
        username: '',
        password: '',
        confirm_password: '',
        ibuyflowers: false,
        auto_buy: false,
        standing_orders: false,
        purchase_orders: false,
        claims: false,
        accounting: false
    };

    componentDidMount() {
        let state;

        // if the modal is to add a new user only fill the company name in the modal
        if (this.props.type === 'add') {
            state = {
                company_name: this.props.companyName
            };
        } else {
            // if the modal is to edit an user, then fill the information so the user can modify it
            const {
                first_name, last_name, phone, cellphone, skype, user_email, config
            } = this.props.user;

            state = {
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                cellphone: cellphone,
                skype: skype,
                company_name: this.props.companyName,
                contact_email: user_email,
                confirm_contact_email: user_email,
                username: this.getUserNameFromEmail(user_email),
                ibuyflowers: config.ibuyflowers,
                auto_buy: config.auto_buy,
                standing_orders: config.standing_orders,
                purchase_orders: config.purchase_orders,
                claims: config.claims,
                accounting: config.accounting
            };
        }

        this.setState(state);
    }

    render() {

        const {onClose, type} = this.props;

        let titleModal;
        if (type === 'add') {
            titleModal = 'Add User\n';
        } else {
            titleModal = 'Edit User\n';
        }

        return (
            <ModalComponent
                size="lg"
                title={titleModal}
                onClose={onClose}
                okClick={this.validateBeforeSend}
                body={
                    <div className="modal-body">
                        <form noValidate="" className="  ">
                            <div className="card mb-3">
                                <div className="card-header">User Info</div>
                                <div className="card-body">
                                    <div className="form-row mb-2">
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="first_name"> First Name:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm" id="first_name"
                                                   name="first_name" required="" type="text"
                                                   value={this.state.first_name}
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="last_name"> Last Name:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm" id="last_name"
                                                   name="last_name" required="" type="text"
                                                   value={this.state.last_name}
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="phone"> Phone:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm" id="phone"
                                                   name="phone" required="" type="text"
                                                   value={this.state.phone}
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-2">
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="cellphone">Cellphone:</label>
                                            <input className="form-control input-sm" id="cellphone"
                                                   name="cellphone" type="text"
                                                   value={this.state.cellphone}
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="skype">Skype:</label>
                                            <input className="form-control input-sm" id="skype"
                                                   name="skype" type="text"
                                                   value={this.state.skype}
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="company">Company:</label>
                                            <input className="form-control input-sm" id="company"
                                                   name="company_name" readOnly={true} type="text"
                                                   value={this.state.company_name}/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-2">
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="email"> Email:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm" id="email"
                                                   name="contact_email" type="email" required=""
                                                   value={this.state.contact_email}
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="confirm_email"> Confirm Email:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm"
                                                   id="confirm_email" name="confirm_contact_email" type="email"
                                                   value={this.state.confirm_contact_email}
                                                   required="" onChange={this.onChangeInputText}/>
                                        </div>

                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="username">Username:</label>
                                            <input className="form-control input-sm" id="username"
                                                   name="username" readOnly={true} type="text"
                                                   value={this.state.username}/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-2">
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="password"> Password:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm"
                                                   id="password" name="password" type="password" required=""
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <label htmlFor="confirm_password"> Confirm Password:
                                                <sup className="text-danger">*</sup>
                                            </label>
                                            <input className="form-control input-sm" id="confirm_password"
                                                   name="confirm_password" type="password" required=""
                                                   onChange={this.onChangeInputText}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="text-danger">
                                        <sup>*</sup> Field Required.
                                    </div>
                                </div>
                            </div>

                            {this.getUserPreferencesCard(this.props.user, this.props.type)}

                        </form>
                    </div>
                }>
            </ModalComponent>
        );
    }

    getUserPreferencesCard = (user, modalType) => {
        if (modalType === 'edit' && user && user.is_admin) {
            // the admin can't edit his own permissions, so let's hide this part
            return null;
        } else {
            return (
                <div className="card">
                    <div className="card-header">User Permissions
                        <sup className="text-danger">*</sup>
                    </div>
                    <div className="card-body clearfix">
                        <div className="row">
                            <div className="checkbox col-6 col-sm-4">
                                <label>
                                    <input name="ibuyflowers" type="checkbox"
                                           checked={this.state.ibuyflowers}
                                           onChange={this.onChangeInputCheckbox}/> iBuyflowers
                                </label>
                            </div>
                            <div className="checkbox col-6 col-sm-4">
                                <label>
                                    <input name="auto_buy" type="checkbox"
                                           checked={this.state.auto_buy}
                                           onChange={this.onChangeInputCheckbox}/> Auto Buy
                                </label>
                            </div>
                            <div className="checkbox col-6 col-sm-4">
                                <label>
                                    <input name="standing_orders" type="checkbox"
                                           checked={this.state.standing_orders}
                                           onChange={this.onChangeInputCheckbox}/> Standing Orders
                                </label>
                            </div>
                            <div className="checkbox col-6 col-sm-4">
                                <label>
                                    <input name="purchase_orders" type="checkbox"
                                           checked={this.state.purchase_orders}
                                           onChange={this.onChangeInputCheckbox}/> Purchase Orders
                                </label>
                            </div>
                            <div className="checkbox col-6 col-sm-4">
                                <label>
                                    <input name="claims" type="checkbox"
                                           checked={this.state.claims}
                                           onChange={this.onChangeInputCheckbox}/> Claims
                                </label>
                            </div>
                            <div className="checkbox col-6 col-sm-4">
                                <label>
                                    <input name="accounting" type="checkbox"
                                           checked={this.state.accounting}
                                           onChange={this.onChangeInputCheckbox}/> Invoice
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    onChangeInputText = event => {
        this.setState({[event.target.name]: event.target.value});

        if (event.target.name === 'contact_email') {
            // when the user enters the email, then generate his username
            this.setState({username: this.getUserNameFromEmail(event.target.value)});
        }
    };

    getUserNameFromEmail = email => {
        let response = '';
        if (email.includes('@') && email.includes('.')) {
            // extract username
            response = email.substr(0, email.indexOf('.')).replace('@', '.');
        }
        return response;
    };

    onChangeInputCheckbox = event => {
        this.setState({[event.target.name]: event.target.checked});
    };

    validateBeforeSend = () => {

        const {
            first_name, last_name, phone, contact_email,
            confirm_contact_email, password, confirm_password,
            ibuyflowers, auto_buy, standing_orders,
            purchase_orders, claims, accounting,
        } = this.state;

        if (!first_name || !last_name || !phone || !contact_email ||
            !confirm_contact_email) {
            toast('Please fill the requested fields', 'error');
            return;
        }

        if (this.props.type === 'add') {
            // only validate this fields if the modal is to add a new user
            if (!password || !confirm_password) {
                toast('Please fill the requested fields', 'error');
                return;
            }
        }

        if (contact_email !== confirm_contact_email) {
            toast('The emails do not match', 'error');
            return;
        }

        if (password !== confirm_password) {
            toast('The passwords do not match', 'error');
            return;
        }

        if (!ibuyflowers && !auto_buy && !standing_orders && !purchase_orders && !claims && !accounting) {
            toast('You need to select at least one option', 'error');
            return;
        }

        if(this.props.type === 'add'){
            this.props.saveAddUser(this.state);
        }else{
            this.props.saveEditUser(this.state);
        }
    };
}

export default AddUserComponent;