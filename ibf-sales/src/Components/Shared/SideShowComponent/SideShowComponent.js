import React, {Component} from 'react';
import {Transition} from 'react-transition-group'; // ES6
import style from './SideShow.module.css';

class SideShowComponent extends Component {
  render() {
    const {show, position} = this.props;
    const styles = position.split(',').reduce((obj, i) => ({...obj, [i]: 0}), {});
    return (
      <Transition in={show} timeout={500} mountOnEnter unmountOnExit>
        {state => (<div
          className={[style.container, state === 'entering' ? style.Open : state === 'exiting' ? style.Closed : null].join(' ')}
          style={{height: state === 'entering' ? '0%' : state === 'exiting' ? '60%' : null, ...styles}}>
          {this.props.children}
        </div>)
        }
      </Transition>
    
    );
  }
}

export default SideShowComponent;
