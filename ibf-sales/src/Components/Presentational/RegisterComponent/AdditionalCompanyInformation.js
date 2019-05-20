import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {initSignup, setSignUpObject, signup} from "../../../Redux/Actions/ActionsCreators";

class AdditionalCompanyInformation extends Component {
	constructor(props){
		super(props);

		this.state = {
			business: props.signUpState.business,
			stores_quantity: props.signUpState.stores_quantity,
			employees_quantity: props.signUpState.employees_quantity,
			spend_per_week: props.signUpState.spend_per_week,
			events_per_year: props.signUpState.events_per_year,
			privacyPolicy: props.signUpState.privacyPolicy,
			validated: false,
			loading: false
		};
		this.confirmValidation = this.confirmValidation.bind(this);
		this.returnPage = this.returnPage.bind(this);
	}

	handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
		const {value, name} = event.currentTarget;
		this.setState({[name]: value});

		this.props.setSignUpObject({[name]: value});
	};

	confirmValidation(event) {
		var forms = document.getElementsByClassName('needs-validation');

		let validateOtherInputs = false;

		Array.prototype.filter.call(forms, (form) => {
			form.addEventListener('submit', (event) => {
				if (form.checkValidity() === false) {
					validateOtherInputs = true;
				}
				form.classList.add('was-validated');

				if (!validateOtherInputs) {
					this.props.onNext(this.props);
				}

				event.preventDefault();
				event.stopPropagation();
			}, false);
		});
	}

	returnPage(event){
		event.preventDefault();
		event.stopPropagation();
		this.props.onBack(this.state);
	}

	render() {
		const {options} = this.props;
		return (
			<Fragment>
				<div className="card-title mb-0">
					<h2>
						<b>
							Additional company information
						</b>
					</h2>
				</div>
				<div className="card-body p-0">
					<form className="needs-validation" noValidate>
						<div className="form-group normal-register-label">
							<label htmlFor="business">
								<b>
									What is your line of business?
								</b>
								<span className="danger"> * </span>
							</label>

							<div className="form-check">
								<input className="form-check-input" type="radio" name="business" id="florist"
											 checked={this.state.business === "florist"} onChange={this.handleChange}
											 value="florist"/>
									<label className="normal-register-label" htmlFor="florist">
										Florist
									</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="radio" name="business" id="wedding/event"
											 checked={this.state.business === "wedding/event"} onChange={this.handleChange}
											 value="wedding/event"/>
									<label className="normal-register-label" htmlFor="wedding/event">
										Wedding / Events
									</label>
							</div>
							<div className="form-check disabled">
								<input className="form-check-input" type="radio" name="business" id="hotel"
											 checked={this.state.business === "hotel"} onChange={this.handleChange}
											 value="hotel" />
									<label className="normal-register-label" htmlFor="hotel">
										Hotel
									</label>
							</div>
							<div className="form-check disabled">
								<input className="form-check-input" type="radio" name="business" id="venue"
											 checked={this.state.business === "venue"} onChange={this.handleChange}
											 value="venue" />
								<label className="normal-register-label" htmlFor="venue">
									Venue
								</label>
							</div>
							<div className="form-check disabled">
								<input className="form-check-input" type="radio" name="business" id="Other"
											 checked={this.state.business === "Other"} onChange={this.handleChange}
											 value="Other" />
								<label className="normal-register-label" htmlFor="Other">
									Other
								</label>
							</div>
						</div>
						<div className="form-group mt-4">
							<label className="my-1 mr-2 normal-register-label" htmlFor="stores_quantity">
								<b>How many locations do you have?</b>
								<span className="text-danger"> * </span></label>
							<select
								className="form-control input-sm"
								id="stores_quantity"
								name="stores_quantity"
								defaultValue={this.state.stores_quantity}
								onChange={this.handleChange}
								required>
								{
									options.quantity.map(number => (
										<option key={number} value={number}>
											{number ? number : ' -- Choose one --'}
										</option>
									))
								}
							</select>
						</div>
						<div className="form-group mt-4">
							<label className="my-1 mr-2 normal-register-label" htmlFor="employees_quantity">
								<b>How many employees do you have?</b>
								<span className="text-danger"> * </span></label>
							<select
								className="form-control input-sm"
								id="employees_quantity"
								name="employees_quantity"
								defaultValue={this.state.employees_quantity}
								onChange={this.handleChange} required>
								{
									options.quantity.map(number => (
										<option key={number} value={number}>
											{number ? number : ' -- Choose one --'}
										</option>
									))
								}
							</select>
						</div>
						<div className="form-group mt-4">
							<label className="my-1 mr-2 normal-register-label" htmlFor="spend_per_week">
								<b> How much do you spend on average on flowers per week? </b>
								<span className="text-danger"> * </span></label>
							<select
								className="form-control input-sm"
								id="spend_per_week"
								name="spend_per_week"
								value={this.state.spend_per_week}
								onChange={this.handleChange} required>
								{
									options.expenses.map(number => (
										<option key={number} value={number}>
											{number ? number : ' -- Choose one --'}
										</option>
									))
								}
							</select>
						</div>
						<div className="form-group mt-4">
							<label className="my-1 mr-2 normal-register-label" htmlFor="employees_quantity">
								<b>How many events do you have pear year? </b>
								<span className="text-danger"> * </span> </label>
							<select
								className="form-control input-sm"
								id="events_per_year"
								name="events_per_year"
								value={this.state.events_per_year}
								onChange={this.handleChange} required>
								{
									options.events.map(number => (
										<option key={number} value={number}>
											{number? number : ' -- Choose one --'}
										</option>
									))
								}
							</select>
						</div>
						<div className="d-flex justify-content-between">
							<button className="btn btn-link text-right" onClick={this.returnPage}>
								&lt; Previous
							</button>
							<button className="btn btn-primary text-right" onClick={this.confirmValidation} disabled={this.props.isSignup}>
								{!this.props.isSignup && <span> Confirm Registration > </span>}
								{this.props.isSignup && <span> <i className="fa fa-spinner fa-spin"/> </span>}
							</button>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state){
	const { isSignup, signUpState } = state.LoadingReducer;
	return { isSignup, signUpState };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setSignUpObject, signup, initSignup
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalCompanyInformation);
