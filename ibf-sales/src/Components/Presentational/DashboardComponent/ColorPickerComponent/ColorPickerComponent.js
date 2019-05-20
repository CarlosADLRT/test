import React, {Component} from 'react';
import Logo from '../../../../Assets/Images/icons/ms-icon-70x70.png';

type state = {
  colors: array<any>
}

class ColorPickerComponent extends Component<{}, state>{

  state = {
    colors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 31, 41, 51, 61, 71, 81, 52, 72, 82, 62, 32, 53, 43, 23, 46, 69, 19, 47, 66, 25]
  };

  componentDidMount(){
  }

  render(){
    const {colors} = this.state;
    return (
        <div className = "container mb-3">
          <div className = "row">
            <h2>FIND BY COLOR</h2>
          </div>
          <div className = "row">
            {colors.map(i => (
              <img src = {Logo} alt = "" height = {35} className = "color-picker-flower" key={i}/>
            ))}
          </div>
        </div>
    );
  }
}

export default ColorPickerComponent;
