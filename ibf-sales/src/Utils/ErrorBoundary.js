import React, {Component} from 'react';
import {TrackJS} from 'trackjs';
import Emma from '../Assets/Images/emma@3x.jpg'

export default class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error){
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo){
    if(errorInfo && errorInfo.componentStack){
      // The component stack is sometimes useful in development mode
      // In production it can be somewhat obfuscated, so feel free to omit this line.
      console.log(errorInfo.componentStack);
    }

    window.TrackJS && TrackJS.track(error);
    this.setState({error});
  }

  click = () => {
    window.location.reload();
  };

  render(){
    // Whatever rendering of error messages or children components you would like
    if(this.state.hasError){

      return (
          <div className = "border border-light p-4" style = {{position: 'absolute', left: '25%', top: '30%'}}>
            <div className = "d-flex align-items-center justify-content-start">
              <img className = "mr-3" src = {Emma} alt = ""/>
              <span>
                We're sorry, something went wrong. You can reload the page by <span
                  className = "link-ibf-purply" onClick = {this.click}>clicking here</span>
              </span>


            </div>
          </div>
      );
    } else{
      return this.props.children;
    }
  }
}
