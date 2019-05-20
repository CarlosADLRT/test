import React, { Component, Fragment } from 'react';
import LogoColor from '../../../../Assets/Images/logo-color-large.png';
import environment from './../../../../environment';
import { NavLink } from 'react-router-dom';

class LoginNavbarComponent extends Component {
	render() {
		return (
			<Fragment>
				<header className='login-header l'>
					<div className='header_mid'>
						<nav className='navbar px-0 navbar-expand-lg navbar-light bg-light login-navbar-header'>
							<div className='logo-wrap'>
								<img src={LogoColor} alt='Logo' className='login-navbar-logo' />
							</div>
							<button
								className='navbar-toggler'
								type='button'
								data-toggle='collapse'
								data-target='#navbarText'
								aria-controls='navbarText'
								aria-expanded='false'
								aria-label='Toggle navigation'
							>
								<span className='navbar-toggler-icon' />
							</button>
							<div className='collapse navbar-collapse login-navbar-mid' id='navbarText'>
								<ul className='navbar-nav mr-auto navigation'>
									<li className='nav-item active'>
										<a
											className='login-navbar-mid-link'
											href={environment.loginNavUrls.aboutUs}
											target='_blank'
											rel='noopener noreferrer'
										>
											<span className='nav-title'>ABOUT US </span>
										</a>
										<ul className='sub-menu'>
											<li>
												<a
													href={environment.loginNavUrls.coreValues}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> Core Values</span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.premiumFarmers}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> Our Premium Farmers </span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.givingBack}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> Giving Back </span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.wholeSale}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> Wholesale</span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.testimonials}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> Testimonials</span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.jobs}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> Jobs</span>
												</a>
											</li>
										</ul>
									</li>
									<li className='nav-item'>
										<a
											className='login-navbar-mid-link'
											href={environment.loginNavUrls.shopFor}
											target='_blank'
											rel='noopener noreferrer'
										>
											<span className='nav-title'> SHOP FOR...</span>
										</a>
										<ul className='sub-menu'>
											<li>
												<a
													href={environment.loginNavUrls.aFloralShop}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> A floral shop</span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.aWedding}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> A wedding </span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.anEvent}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> An event </span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.aHotel}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> A hotel</span>
												</a>
											</li>
											<li>
												<a
													href={environment.loginNavUrls.aVenue}
													target='_blank'
													rel='noopener noreferrer'
												>
													<span> A venue</span>
												</a>
											</li>
										</ul>
									</li>
									<li className='nav-item'>
										<a
											className='login-navbar-mid-link'
											href={environment.loginNavUrls.blog}
											target='_blank'
											rel='noopener noreferrer'
										>
											<span className='nav-title'> BLOG</span>{' '}
										</a>
									</li>
									<li className='nav-item'>
										<a
											className='login-navbar-mid-link'
											href={environment.loginNavUrls.contact}
											target='_blank'
											rel='noopener noreferrer'
										>
											<span className='nav-title'> CONTACT</span>{' '}
										</a>
									</li>
									<li className='nav-item'>
										<a className='login-navbar-mid-link' href='/#/login'>
											<span className='nav-title accessOptions'> LOGIN</span>{' '}
										</a>
									</li>
									<li className='nav-item'>
										<NavLink to='/signup'>
											<span className='nav-title accessOptions'> REGISTER</span>
										</NavLink>
									</li>
								</ul>
							</div>
						</nav>
					</div>
				</header>
			</Fragment>
		);
	}
}

export default LoginNavbarComponent;
