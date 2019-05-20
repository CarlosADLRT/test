import React, {Component} from 'react';
import Logo from '../../../Assets/Images/logo-main-color.png';
import './FooterComponent.scss';

class FooterComponent extends Component{
  componentDidMount(){
  }

  render(){
    return (
        <footer className="ibf-footer d-flex flex-column align-items-center justify-content-center">
          <img src = {Logo} height={45} alt = ""/>
          <div className="d-flex justify-content-around ibf-footer-social">
            <a href = "https://www.instagram.com/ibuyflowers/" target="_blank" rel="noopener noreferrer" className="link-ibf-greyish-brown"><i className="fab fa-2x fa-instagram"/></a>
            <a href = "https://www.facebook.com/ibuyflowersllc/" target="_blank" rel="noopener noreferrer" className="link-ibf-greyish-brown"><i className="fab fa-2x fa-facebook-f"/></a>
            <a href = "https://www.pinterest.com/ibuyflowers" target="_blank" rel="noopener noreferrer" className="link-ibf-greyish-brown"><i className="fab fa-2x fa-pinterest-p"/></a>
          </div>
        </footer>
    );
  }
}

export default FooterComponent;