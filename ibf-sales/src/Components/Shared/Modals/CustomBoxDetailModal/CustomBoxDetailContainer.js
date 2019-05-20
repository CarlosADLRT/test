import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {closeModal} from "../../../../Redux/Actions/ModalActionsCreators";

import {CUSTOM_BOX_DETAIL_MODAL} from '../ModalTypes';
import CustomBoxDetailComponent from './CustomBoxDetailComponent';

class CustomBoxDetailContainer extends Component<{}, state>{

    render(){
        return (
            <CustomBoxDetailComponent
                onClose = {() => this.props.closeModal({modal: CUSTOM_BOX_DETAIL_MODAL})}
                data={this.props.data}/>
        );
    }
}

function mapStateToProps(state){
    const {data} = state.ModalReducer.customBoxDetailModal;
    return {data};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeModal: closeModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomBoxDetailContainer);
