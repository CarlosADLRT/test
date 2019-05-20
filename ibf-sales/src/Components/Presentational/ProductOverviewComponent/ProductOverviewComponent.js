import React, {Component, Fragment} from 'react';
import ProductListComponent from './ProductListComponent/ProductListComponent';
import InfiniteScroll from 'react-infinite-scroller';
import SideShowComponent from '../../Shared/SideShowComponent/SideShowComponent';
import style from './ProductOverviewComponent.module.css';
import CustomBoxContainer from '../../Containers/CustomBoxContainer/CustomBoxContainer';
import FilterBarContainer from '../../Containers/FilterBarContainer/FilterBarContainer';
import {Modal, ModalBody} from 'reactstrap';
import Emma from '../../../Assets/Images/emma@3x.jpg';


class ProductOverviewComponent extends Component {
	state = {
		page: 1
	};

	loadFunc = () => { /* load more items here */
		this.props.loadMore(this.state.page + 1);
		this.setState(prev => ({...prev, page: prev.page + 1}));
	};


	render() {
		const {list, requestingLoadInventory, spinner, isEmpty,totalItems, cartbox, showCustomBox, showToggle, isCurrentBox} = this.props;
		return (
			<div style={{paddingBottom: isCurrentBox ? '80px' : '0'}}>
				{
					isCurrentBox &&
					<div id="customBoxButton"
							 className={['btn btn-primary clickable d-flex align-items-center justify-content-center flex-column', style['btn-custom-box']].join(' ')}
							 style={{bottom: showToggle ? '70%' : 0}}
							 onClick={() => showCustomBox(!showToggle)}>
						<div className="text-center mb-2">{cartbox.current_percentage}%

						</div>
						<div className="progress" style={{width: '100px'}}>
							<div className="progress-bar bg-strong-pink "
									 style={{width: cartbox.current_percentage, color: 'gray'}}
									 role="progressbar" aria-valuenow={cartbox.current_percentage} aria-valuemin="0"
									 aria-valuemax="100"/>
						</div>
					</div>
				}
				<FilterBarContainer/>
				{!!spinner && <Modal
					centered={true}
					isOpen={true}>
					<ModalBody>
						<div className="d-flex">
							<img src={spinner} alt="" className="mr-4"/>
						</div>
					</ModalBody>
				</Modal>}
				{isEmpty && !spinner && !isCurrentBox ?
					<div className="row justify-content-center">
						<div className="col-7 text-center">
							<div className="alert text-center alert-warning">
								<p className="mb-0">
									With the filter(s) you have selected, we did not find any result for the selected
									arrival date if you want
									to <b>search at other dates</b> please <span className="clickable text-primary"
																															 onClick={this.props.nextAvailableModal}>Click Here</span>
								</p>
							</div>
							<img src={Emma} alt=""/>
						</div>
					</div> :
					<Fragment>
						<div>
							<InfiniteScroll
								pageStart={0}
								threshold={300}
								loadMore={this.loadFunc}
								hasMore={totalItems > list.length && !requestingLoadInventory}>
								<ProductListComponent list={list}/>
							</InfiniteScroll>
							{requestingLoadInventory && list.length > 0 && <div className="loader" key={0}>
								<div className="d-flex justify-content-center mb-2">
									<i className='fa fa-spinner fa-spin fa-2x'/>
								</div>
								<h4 className="d-flex justify-content-center">
									Loading {list.length <= totalItems ? list.length : totalItems} of {totalItems}
								</h4>
							</div>}
						</div>
					</Fragment>}

				<SideShowComponent position={'bottom,left'} show={showToggle}>
					<CustomBoxContainer/>
				</SideShowComponent>
			</div>

		);
	}
}

export default ProductOverviewComponent;
