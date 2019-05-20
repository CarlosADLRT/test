import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setSignUpObject} from "../../../Redux/Actions/ActionsCreators";

class ContactDetailsComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			inputType: 'password',
			inputTypeRepeat: 'password',
			isShowingPassword: false,
			isShowingRepeatPassword: false,
			validated: false
		};

		this.confirmValidation = this.confirmValidation.bind(this);
	}

	changeParam(value, myInput, myShowingButton) {
		this.setState({[myShowingButton]: value});

		value ? this.setState({[myInput]: 'text'}) : this.setState({[myInput]: 'password'});
	}

	passwordValidation() {
		const {password} = this.props.signUpState;
		return (password.length < 8 ||
			!password.match(/\d/) ||
			!password.match(/[*@!#%&()^[\]~{}?¿¡]+/));
	}

	passwordRepeat(){
		const {password, repeatPassword} = this.props.signUpState;
		return password !== repeatPassword;
	}

	emailValidation(){
		const {user_email, repeatEmail} = this.props.signUpState;
		return user_email !== repeatEmail;
	}

	confirmValidation() {
		let validate = this.passwordValidation() || this.emailValidation() || this.passwordRepeat();
		var forms = document.getElementsByClassName('needs-validation');

		let validateOtherInputs = false;

		Array.prototype.filter.call(forms, (form) => {
			form.addEventListener('submit', (event) => {
				if (form.checkValidity() === false) {
					validateOtherInputs = true;
				}
				form.classList.add('was-validated');

				if(!validateOtherInputs && !validate){
					this.props.onNext(this.props);
				}
				event.preventDefault();
				event.stopPropagation();
			}, false);
		});
	}

	handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
		const {value, name} = event.currentTarget;
		const isValidPhone = value.length <= 10 && !isNaN(value) && name === 'office_phone';

		if(isValidPhone || name !== 'office_phone'){
			this.setState({[name]: value});
			this.props.setSignUpObject({[name]: value});
		}
	};

	handleFormatNumber = (number) => {
		let office_phone = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
		this.props.setSignUpObject({office_phone});
	};

	handleDeleteFormatNumber = (number) => {
		let office_phone = number.split("-").join("");
		this.props.setSignUpObject({office_phone});
	};

	render() {
		const { first_name, last_name, office_phone, user_email, repeatEmail, password, repeatPassword } = this.props.signUpState;
		return (
			<Fragment>
				<div className="card-title mb-0">
					<h2>
						<b>
							Contact details
						</b>
					</h2>
				</div>
				<div className="card-body p-0">
					<form className="needs-validation" noValidate autoComplete="new-password">
						<div className="form-group input-register">
							<input type="text" className="form-control" name="first_name" defaultValue={first_name} id="FirstName" onChange={this.handleChange}
										 required/>
							<div className="invalid-feedback">
								You must write a name
							</div>
							<label htmlFor="FirstName" className="register-label">First Name <span className="text-danger"> * </span> </label>
						</div>
						<div className="form-group input-register">
							<input type="text" className="form-control" name="last_name" defaultValue={last_name} id="LastName" onChange={this.handleChange}
										 required/>
							<div className="invalid-feedback">
								You must write a last name
							</div>
							<label htmlFor="LastName" className="register-label">Last Name <span className="text-danger"> * </span> </label>
						</div>
						<div className="form-group input-register">
							<input type="text" className="form-control" name="office_phone" value={office_phone} id="PhoneNumber"
										 onChange={this.handleChange}
										 onFocus={ () => this.handleDeleteFormatNumber(office_phone)}
										 onBlur={ () => this.handleFormatNumber(office_phone)} required/>
							<div className="invalid-feedback">
								You must write a phone number
							</div>
							<label htmlFor="PhoneNumber" className="register-label">Phone Number <span className="text-danger"> * </span> </label>
						</div>
						<div className="form-group input-register">
							<input type="email" className="form-control" name="user_email" value={user_email} id="user_email" onChange={this.handleChange} autoComplete="new-password"
										 required/>
							<div className="invalid-feedback">
								You must write an email
							</div>
							<label htmlFor="EmailAddress" className="register-label">Email Address <span className="text-danger"> * </span> </label>
						</div>
						<div className="form-group input-register">
							<input type="user_email" className="form-control" name="repeatEmail" value={repeatEmail} id="EmailAddressRepeat"
										 onChange={this.handleChange} required/>
							{ this.emailValidation()
								 &&
								(
									<div className="invalid-feedback d-inline-block">
										Email does not match
									</div>
								)
							}
							<label htmlFor="EmailAddressRepeat" className="register-label">Email Address Repeat <span className="text-danger"> * </span> </label>
						</div>
						<div className="form-group input-register">
							<div className="input-group">
								<input name="password" type={this.state.inputType} className="form-control" value={password} id="Password"
											 onChange={this.handleChange} required/>
								<div className="input-group-append">
										<span className="input-group-text text-danger cursor-pointer px-2"
													onClick={() => {
														this.changeParam(true, 'inputType', 'isShowingPassword')
													}} onMouseLeave={() => {
											this.changeParam(false, 'inputType', 'isShowingPassword')
										}}>
											<i
												className={"fa fa-fw text-primary clickable " + (this.state.isShowingPassword ? 'fa-eye ' : 'fa-eye-slash ')}/>
										</span>
								</div>
								{
									this.passwordValidation() && password.length > 0 &&
									(<div className="invalid-feedback d-inline-block">
										Password not valid
									</div>)
								}
								<label htmlFor="Password" className="register-label">Password  <span className="text-danger"> * </span> <small> Min 8 characters, 1 number, 1 special character </small></label>
							</div>
						</div>
						<div className="form-group input-register">
							<div className="input-group">
								<input name="repeatPassword" type={this.state.inputTypeRepeat} value={repeatPassword} className="form-control"
											 id="PasswordRepeat"
											 onChange={this.handleChange} required/>
								<div className="input-group-append">
										<span className="input-group-text text-danger cursor-pointer px-2"
													onClick={() => {
														this.changeParam(true, 'inputTypeRepeat', 'isShowingRepeatPassword')
													}} onMouseLeave={() => {
											this.changeParam(false, 'inputTypeRepeat', 'isShowingRepeatPassword')
										}}>
											<i
												className={"fa fa-fw text-primary clickable " + (this.state.isShowingRepeatPassword ? 'fa-eye ' : 'fa-eye-slash ')}/>
										</span>
								</div>
								<div className="invalid-feedback d-inline-block">
									{password !== repeatPassword && 'Password does not match' }
								</div>
								<label htmlFor="PasswordRepeat" className="register-label">Password Repeat <span className="text-danger"> * </span> </label>
							</div>
						</div>
						<div className="d-flex justify-content-end">
							<button className="btn btn-primary text-right" onClick={this.confirmValidation}>Proceed to Company Details ></button>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state){
	const {signUpState} = state.LoadingReducer;
	return {signUpState};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setSignUpObject: setSignUpObject
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsComponent);
