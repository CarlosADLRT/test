import React, {Component} from 'react';
import environment from '../../../environment';
import './ProductImageComponent.scss';
import placeholder from '../../../Assets/Images/image-placeholder.png';
import custombox from '../../../Assets/Images/custom-box.png';

class ProductImageComponent extends Component {

	componentDidMount() {
	}

	render() {
		const url = this.props.img.indexOf('http') === -1 ? environment.publicPath + this.props.img : this.props.img;
		return (
			<div className="product-image-wrapper">
				<div className="product-image" style={{'backgroundImage': this.props.custom ? 'url(' + custombox + ')' :'url(' + url + '), url(' + placeholder + ')'}}/>
			</div>
		);
	}
}

export default ProductImageComponent;
