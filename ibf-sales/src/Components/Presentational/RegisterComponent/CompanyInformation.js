import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { setSignUpObject } from '../../../Redux/Actions/ActionsCreators';
import connect from 'react-redux/es/connect/connect';
import ZipcodeService from '../../../Services/ZipcodeService';
import DropdownList from 'react-widgets/lib/DropdownList';
class CompanyInformation extends Component {
	state = {
		zipcodes: []
	};

	componentDidMount(): void {
		this.setState({
			customer: this.props.customer,
			states: this.props.states,
			validated: false,
			zipcodes: []
		});

		this.handleChangeState(this.props.signUpState.state);
		this.confirmValidation = this.confirmValidation.bind(this);
		this.returnPage = this.returnPage.bind(this);
	}

	confirmValidation(event) {
		var forms = document.getElementsByClassName('needs-validation');

		let validateOtherInputs = false;

		Array.prototype.filter.call(forms, form => {
			form.addEventListener(
				'submit',
				event => {
					if (form.checkValidity() === false) {
						validateOtherInputs = true;
					}
					form.classList.add('was-validated');

					if (!validateOtherInputs) {
						this.props.onNext(this.props);
					}

					event.preventDefault();
					event.stopPropagation();
				},
				false
			);
		});
	}

	returnPage(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onBack();
	}

	handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
		const { value, name } = event.currentTarget;
		this.setState({ [name]: value });

		this.props.setSignUpObject({ [name]: value });
		if (name === 'state') {
			this.handleChangeState(value);
		}
	};

	handleChangeSelect = value => {
		this.setState({ zipcode: value });

		this.props.setSignUpObject({ zipcode: value });
	};

	handleChangeState = state => {
		const codes = ZipcodeService.getZipcodeByState(state);
		this.props.setSignUpObject({ zipcode: codes[0] });
		this.setState({
			zipcodes: codes,
			zipcode: codes[0]
		});
	};

	render() {
		const { company_name, street, city, state, zipcode, tax_id } = this.props.signUpState;
		return (
			<Fragment>
				<div className='card-title mb-0'>
					<h2>
						<b>Company details</b>
					</h2>
				</div>
				<div className='card-body p-0'>
					<form className='needs-validation' noValidate>
						<div className='form-group input-register'>
							<input
								type='text'
								className='form-control'
								name='company_name'
								id='company_name'
								defaultValue={company_name}
								onChange={this.handleChange}
								required
							/>
							<div className='invalid-feedback'>You must write a Company Name</div>
							<label htmlFor='company_name' className='register-label'>
								Company Name <span className='text-danger'> * </span>{' '}
							</label>
						</div>
						<div className='form-group input-register'>
							<input
								type='text'
								className='form-control'
								name='street'
								id='street'
								defaultValue={street}
								onChange={this.handleChange}
								required
							/>
							<div className='invalid-feedback'>You must write a street address</div>
							<label htmlFor='street' className='register-label'>
								Street <span className='text-danger'> * </span>{' '}
							</label>
						</div>
						<div className='form-group input-register'>
							<input
								type='text'
								className='form-control'
								name='city'
								id='city'
								defaultValue={city}
								onChange={this.handleChange}
								required
							/>
							<div className='invalid-feedback'>You must write a city</div>
							<label htmlFor='city' className='register-label'>
								City <span className='text-danger'> * </span>{' '}
							</label>
						</div>
						<div className='form-group normal-register-label'>
							<label htmlFor='state'>
								<b>States</b> <span className='text-danger'> * </span>{' '}
							</label>
							<select
								className='form-control input-sm'
								name='state'
								defaultValue={state}
								onChange={this.handleChange}
							>
								{Object.keys(this.props.states).map(state => {
									return (
										<option key={state} value={state}>
											{this.props.states[state]}
										</option>
									);
								})}
							</select>
						</div>
						<div className='form-group normal-register-label'>
							<label htmlFor='zipcode'>
								<b>
									Zipcodes <span className='text-danger'> * </span>{' '}
								</b>
							</label>
							{/* <select
								className="form-control input-sm"
								name="zipcode"
								value={zipcode}
								onChange={this.handleChange}>
								{
									this.state.zipcodes.map(zipcode => (
										<option key={zipcode} value={zipcode}>
											{zipcode}
										</option>
									))
								}
							</select> */}
							<DropdownList
								onChange={this.handleChangeSelect}
								data={this.state.zipcodes}
								value={zipcode}
								filter={'startsWith'}
							/>
						</div>
						<div className='form-group input-register'>
							<input
								type='number'
								className='form-control'
								name='tax_id'
								id='tax_id'
								onChange={this.handleChange}
								defaultValue={tax_id}
								autoComplete='none'
								required
							/>
							<div className='invalid-feedback'>You must write a Resale Number</div>
							<label htmlFor='tax_id' className='register-label'>
								Resale Number <span className='text-danger'> * </span>{' '}
							</label>
						</div>
						<div className='d-flex justify-content-between'>
							<button className='btn btn-link text-right' onClick={this.returnPage}>
								&lt; Previous
							</button>
							<button className='btn btn-primary text-right' onClick={this.confirmValidation}>
								Proceed to additional info >
							</button>
						</div>
					</form>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { signUpState } = state.LoadingReducer;
	return { signUpState };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			setSignUpObject: setSignUpObject
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompanyInformation);
