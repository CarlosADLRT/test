import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

class ModalComponent extends Component{
  render(){
    const {
      title, body, onClose, okText, okClick, cancelText, className, size, footerEnabled = true, customFooter,
      iconClassName = '', bodyClassName, headerEnabled = true
    } = this.props;
    return (
        <div>
          <Modal isOpen = {true} toggle = {onClose} className = {className} size = {size} centered={true}>
            {
              headerEnabled &&
              <ModalHeader toggle = {onClose}>
                <span className = "text-primary">
                  <i className = {iconClassName}/>
                </span> {title}
              </ModalHeader>
            }
            <ModalBody className={bodyClassName} style = {{overflow: 'auto',maxHeight: '60vh'}}>
              {body}
            </ModalBody>
            {
              (footerEnabled && !customFooter) && <ModalFooter>
                <Button color = "primary" onClick = {okClick}>{okText || 'Continue'}</Button>
                {cancelText && <Button color = "secondary" onClick = {onClose}>{cancelText}</Button>}
              </ModalFooter>
            }
            {!!customFooter && <ModalFooter>{customFooter}</ModalFooter>}
          </Modal>
        </div>
    );
  }
}

export default ModalComponent;
