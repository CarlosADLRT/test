import React, {Component} from 'react';
import ModalComponent from '../ModalComponent';
import './UsersListComponent.scss';

class UsersListComponent extends Component {

    render() {

        const {users, onClose} = this.props;

        return (
            <ModalComponent
                size="lg"
                title={'Users\n'}
                onClose={onClose}
                footerEnabled={false}
                bodyClassName='user-list-modal-body'
                body={
                    <div className="user-list">
                        <ul className="list-group m-0">
                            {
                                users.map(item => {
                                    return this.getUserListItem(item);
                                })
                            }
                        </ul>
                    </div>
                }>
            </ModalComponent>
        );
    }

    getUserListItem = user => {
        const {first_name, last_name, user_email, phone, cellphone, skype, is_admin, config} = user;
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-12">
                        <div className="media">
                            <div className="mr-2">
                                <i className={is_admin ? 'fal fa-2x fa-user text-danger' : 'fal fa-2x fa-user text-primary'}/>
                            </div>
                            <div className="media-body">
                                <span className="h4"> {first_name} {last_name}
                                    <small> (<span>{is_admin ? 'Administrator' : 'User'}</span>) </small>
                                </span>
                                <dl className="dl-horizontal--text-left">
                                    <dt className="user-list-header">
                                        <i className="color-blue far fa-envelope"/> Email:
                                    </dt>
                                    <dd className="user-list-value"> {user_email}</dd>
                                    <dt className="user-list-header">
                                        <i className="color-blue far fa-phone"/> Phone:
                                    </dt>
                                    <dd className="user-list-value"> {phone ? phone : 'n/a'}</dd>
                                    <dt className="user-list-header">
                                        <i className="color-blue far fa-mobile-alt"/> Cellphone:
                                    </dt>
                                    <dd className="user-list-value"> {cellphone ? cellphone : 'n/a'}</dd>
                                    <dt className="user-list-header">
                                        <i className="color-blue fab fa-skype"/> Skype:
                                    </dt>
                                    <dd className="user-list-value"> {skype ? skype : 'n/a'}</dd>
                                    <dt className="user-list-header">
                                        <i className="color-blue far fa-unlock-alt"/> User Options:
                                    </dt>
                                    <dd className="user-list-value">
                                        <span className="info">{this.getUserOptions(is_admin, config)}</span>
                                    </dd>
                                </dl>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-primary btn-sm mr-2"
                                        onClick={() => this.props.editUserClick(user)}>
                                    <i className="far fa-edit"/>
                                    <span className="hidden-xs hidden-sm"> Edit User</span>
                                </button>

                                {
                                    is_admin ? null :
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => this.props.deleteUserClick(user)}>
                                            <i className="far fa-user-times"/>
                                            <span className="hidden-xs hidden-sm"> Delete User</span>
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    getUserOptions = (is_admin, config) => {
        if (is_admin) {
            return 'Administrator (all options)';
        } else {
            let options = [];
            let response = '';

            if (config.ibuyflowers) {
                options.push('iBuyFlowers');
            }

            if (config.auto_buy) {
                options.push('Auto Buy');
            }

            if (config.standing_orders) {
                options.push('Standing Orders');
            }

            if (config.purchase_orders) {
                options.push('Purchase Orders');
            }

            if (config.claims) {
                options.push('Claims');
            }

            if (config.accounting) {
                options.push('Accounting');
            }

            options.forEach((item, index) => {
                response += item;

                if (index !== options.length - 1) {
                    response += ' - ';
                }
            });

            return response;
        }
    };
}

export default UsersListComponent;
