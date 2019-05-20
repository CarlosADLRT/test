import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {bindActionCreators} from 'redux';
import {FINISH_ORDER_MODAL} from '../ModalTypes';
import Emma from '../../../../Assets/Images/emma.jpg';
import {withRouter} from 'react-router-dom';
import {restartInventory} from '../../../../Redux/Actions/ActionsCreators';
import * as queryString from 'query-string';

class FinishOrderModal extends Component {
    render() {
        const {closeModal, PO, history, lastDate} = this.props;
        return (
            <Modal centered isOpen={true}>
                <ModalHeader>THANK YOU! YOUR ORDER HAS BEEN
                    PLACED.</ModalHeader>
                <ModalBody>
                    <div className="media">
                        <img src={Emma} className="mr-3" alt=""/>
                        <div className="media-body">
                            <p>
                                Your order number is {PO && PO.consecutive}
                            </p>
                            <p>
                                We have received your order and will email you a confirmation shortly. You can check the
                                status of this
                                order on your <span className="link-ibf-purply" onClick={() => {
                                history.push('/accounting');
                                closeModal({modal: FINISH_ORDER_MODAL});
                            }}>dashboard</span>
                            </p>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => {
                        closeModal({modal: FINISH_ORDER_MODAL});
                        if (lastDate) {

                            history.push({pathname: '/search', search: '?' + queryString.stringify({date: lastDate})});
                        } else {
                            history.push('/search');
                        }
                    }}>Continue
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps({ShoppingCartReducer, ProductReducer}) {
    const {
        PO
    } = ShoppingCartReducer;
    const {
        lastDate
    } = ProductReducer;
    return {
        PO, lastDate
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({closeModal, restartInventory}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FinishOrderModal));
