import React, {Component} from 'react';
import './SpinnerComponent.scss';
import {Modal, ModalBody} from 'reactstrap';
import EmmaLogo from '../../../Assets/Images/emma.jpg';

class SpinnerComponent extends Component{

	state = {
		dontShowAgain: false
	};

	handleChange = event => {
		const name = event.target.name;
		if(event.target.checked) {
			localStorage.setItem('dontShowCustomBoxModal', 'true')
		} else {
			localStorage.removeItem('dontShowCustomBoxModal');
		}
		this.setState({[name]: event.target.checked});
	};

	render(){
		const {title, body, footer, size, hideCheckbox} = this.props;
		return (
			<Modal isOpen = {true} size = {size} centered>
				<ModalBody>
					<div className = "media">
						<img src = {EmmaLogo} alt = "" className = "mr-4"/>
						<div className = "media-body d-flex flex-column">
							<div className = "mb-2 d-flex">
								{title}
							</div>
							<div className = "">
								{body}
							</div>
							{!hideCheckbox &&
							<div className = "">
								<div className = "form-check">
									<input onClick = {() => localStorage.setItem('dontShowCustomBoxModal', 'true')}
												 className = "form-check-input" type = "checkbox" name="dontShowAgain" id="dontShowAgain"
												 onChange={this.handleChange} value = {this.state.dontShowAgain}/>
									<label className = "form-check-label" htmlFor = "dontShowAgain">
										Don't show again
									</label>
								</div>
							</div>
							}
							{footer &&
							<div className = "">
								{footer}
							</div>}
						</div>
					</div>
				</ModalBody>
			</Modal>
		);
	}
}

export default SpinnerComponent;
