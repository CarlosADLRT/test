import React, {Component, Fragment} from 'react';
import 'react-day-picker/lib/style.css';
import './DashboardComponent.scss';
import Season from './SeasonComponent/SeasonComponent';
import Country from './CountryComponent/CountryComponent';
import SearchComponent from './SearchComponent/SearchComponent';
import {convertDateToNumberDate} from '../../../Utils/Utilities';
import {withRouter} from 'react-router-dom';
import Favorite from '../../../Assets/Images/Favorite.jpg';
import Promotions from '../../../Assets/Images/Promotions.jpg';
import queryString from 'query-string';
import EmmaGif from '../../../Assets/Images/PullingAccountData.gif';

class DashboardComponent extends Component {

	search(filter) {
		const {addFilter, config, history} = this.props;
		const params = {date: convertDateToNumberDate(new Date())};
		if (filter === 'grower') {
			addFilter({type: filter, key: config.growerOfTheMonth.key});
		} else {
			params.filter = filter;
		}
		history.push({
			pathname: '/search',
			search: `?${queryString.stringify(params)}`
		});
	}

	render() {
		const {home, config, finished} = this.props;

		return (

			<div style={{minHeight: 'calc(100vh - 138px)'}} className="container">
				{!finished ?
					<div style={{position: 'absolute', left: '33%', top: '40%'}}>
						<img src={EmmaGif} alt="" className="emma-loading-img"/>
					</div> : (
						<Fragment>
							<div className="row mb-4">
								<div className="col-6">
									<SearchComponent holidays={this.props.holidays}
																	 disabledDaysOfWeek={this.props.disabledDaysOfWeek}/>
								</div>

								<div className="col-3 text-primary clickable dashboard-info jus"
								>
									<div style={{backgroundImage: `url(${Favorite})`}}
											 className="bg-image rounded-top d-flex justify-content-center align-items-center mb-3  flex-1-1">
										<div className="bg-white p-3 rounded font-size-md"
												 onClick={() => this.search('favorite')}>
											FAVORITE FLOWERS
										</div>
									</div>

									<div
										className="bg-image d-flex rounded-bottom justify-content-center align-items-center flex-1-1"
										style={{backgroundImage: `url(${Promotions})`}} onClick={() => this.search('special')}>
										<div className="bg-white p-3 rounded font-size-md">
											PERSONAL PROMOTIONS
										</div>
									</div>

								</div>
								<div className="col-3 text-primary" onClick={() => this.search('grower')}>
									<div
										className="w-100 h-100 d-flex justify-content-center  align-items-end bg-image clickable py-2"
										style={{backgroundImage: `url("${config.growerOfTheMonth.image}")`}}>
										<div className="bg-white p-3 rounded font-size-md">
											GROWER OF THE MONTH
										</div>
									</div>
								</div>
							</div>

							{/*<ColorPicker/>*/}

							<Season
								seasons={home.seasons.slice(0, 8)}
							/>

							<Country
								countries={home.countries.reduce((obj, item) => {
									obj[item.country_iso] = item;
									return obj;
								}, {})}
							/>
						</Fragment>
					)}

			</div>
		);
	}
}


export default withRouter(DashboardComponent);
