import React, {Component} from 'react';
import './BackToTopComponent.scss';

class BackToTopComponent extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollStep = this.scrollStep.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      intervalId: 0,
      visible: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 100) {
      this.setState({ ...this.state, visible: true });
    }
    if (scrollTop <= 100) {
      this.setState({ ...this.state, visible: false });
    }
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 100);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep, 10);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <div className={"back-to-top " + (this.state.visible ? 'd-block' : 'd-none')} onClick={this.scrollToTop}>
        <i className="fa fa-chevron-up" />
      </div>
    );
  }
}

export default BackToTopComponent;
