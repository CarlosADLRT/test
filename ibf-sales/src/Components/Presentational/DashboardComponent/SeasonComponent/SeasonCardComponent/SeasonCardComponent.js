import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import env from '../../../../../environment';
import {convertDateToNumberDate} from '../../../../../Utils/Utilities';

class SeasonCardComponent extends Component {

	search(key, from) {
		const today = convertDateToNumberDate(new Date());
		this.props.history.push({
			pathname: '/search',
			search: `?date=${from < today ? today : from}&season=${key}`
		});
	}

	render() {
		const {name, from, key} = this.props.season;
		return (
			<div className="col-3" key={name}>
				<div className="bg-ibf-light-pink clickable" onClick={() => this.search(key, from)}>
					<div className="pt-3 px-3">
						<div className="season-image"
								 style={{backgroundImage: `url("${env.publicPathV3}Assets/Images/Seasons/${encodeURI(name)}.jpg")`}}/>
					</div>
					<p className="pt-2 pl-3 font-size-md"> {name}</p>
				</div>
			</div>
		);
	}
}

export default withRouter(SeasonCardComponent);
