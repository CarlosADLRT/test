import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import RegisterComponent from '../../Presentational/RegisterComponent/RegisterComponent';
import queryString from "query-string";

function mapStateToProps(state) {
	return {};
}

class RegisterContainer extends Component {


	constructor(props) {
		super(props);
		const params = queryString.parse(this.props.location.search.slice(1));

		this.state = {
			referral: params.referral_code || '',
			email: params.email || ''
		};
	}

	render() {

		const {referral, email} = this.state;
		return (
			<Fragment>
				<RegisterComponent referral={referral} email={email}/>
			</Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
)(RegisterContainer);
