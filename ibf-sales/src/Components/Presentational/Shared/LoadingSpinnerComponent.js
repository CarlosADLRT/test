import React, {Component} from 'react';

class LoadingSpinnerComponent extends Component {
  render() {
    const size = this.props.size;
    return (
        <div style={{position: 'absolute', left: '48%', top: '40%'}}>
          <i className={`fa fa-spinner fa-spin ${size ? `fa-${size}x` : "fa-3x"}`}> </i>
        </div>
    )
  }
}

export default LoadingSpinnerComponent;