import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './CountryCardComponent.scss';

class CountryCardComponent extends Component {

    search(key) {
        this.props.addFilter({key, type: 'country'});
        this.props.history.push('/search');
    }

    render() {
        const {country, growers, varieties} = this.props;
        return (
            <div className={`col-${this.props.size} my-2`}>
                <div className="bg-ibf-light-pink clickable " onClick={() => this.search(country._KEY)}>
                    <div className="country-card-bg-cover"
                         style={{backgroundImage: "url(" + country.cover + ")"}}>
                        <div className="country-card-footer font-size-md">
                            <div>{growers} Growers | {varieties} Varieties</div>
                            <div>
                                <img src={country.flag} className="country-card-flag" alt=""/> {" " + country.country}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(CountryCardComponent);
