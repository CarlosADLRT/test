import React, {Component} from 'react';
import ModalComponent from '../ModalComponent';
import './AccountManagerComponent.scss';
import {getPhoneLabel} from '../../../../Utils/Utilities';

class AccountManagerComponent extends Component {

    render() {
        const {managerName, managerPhone, managerEmail} = this.props;

        return (
            <ModalComponent
                size="lg"
                title={'Contact your account manager\n'}
                onClose={this.props.onClose}
                footerEnabled={false}
                body={
                    <div>
                        <div className="media">
                            <img className="mr-4" height="90"
                                 src="https://image.flaticon.com/icons/svg/747/747376.svg"
                                 width="90" alt=""/>
                            <div className="media-body align-self-center">
                                <strong>{managerName}</strong>
                                <span className="d-block">
                                    <i className="far fa-phone mr-2"/>
                                    <a className="text-primary"
                                       href={"tel:" + managerPhone}>{getPhoneLabel(managerPhone)}</a>
                                </span>
                                <span className="d-block">
                                    <i className="far fa-envelope mr-2"/>
                                    <a className="text-primary"
                                       href={"mailto:" + managerEmail}>{managerEmail}</a>
                                </span>
                            </div>
                        </div>

                        <div className="manager-separator my-3">
                            <span className="px-2">OR</span>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <span className="bg-soft clickable manager-card d-flex justify-content-center align-items-center"
                                   id="show-manager-itercom">
                                    <div className="text-primary text-center">
                                        <i className="far fa-2x fa-comment-alt-lines d-block mb-1"/>
                                        <span>
                                            Chat
                                        </span>
                                    </div>
                                </span>
                            </div>
                            <div className="col-6">
                                <a className="bg-soft manager-card d-flex justify-content-center align-items-center"
                                   href="http://help.ibuyflowers.com/"
                                   id="show-manager-help" rel="noopener noreferrer" target="_blank">
                                    <div className="text-primary text-center">
                                        <i className="far fa-2x fa-question-circle d-block mb-1"/>
                                        <span>
                                            Help center
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                    </div>}>
            </ModalComponent>
        );
    }


}

export default AccountManagerComponent;
