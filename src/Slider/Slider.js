/**
 * Slider component
 *
 */

import React from 'react';
import './Slider.css';

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentDidMount() {
    this._runAutoRotate();
  }

  getInitialState() {
    return {
      direction: null,
      initialTouch: null,
      touch: null,
      swipeStart: null,
      position: {
        prev: 0,
        current: 0
      },
      activeSlide: 0,
      intervalId: null
    }
  }

  handleTouchStart(e) {
    if (e.touches.length !== 1) {
      return;
    }
    var touch = e.touches[0];

    this.setState({
      initialTouch: touch
    });
  }

  handleTouchEnd(e) {
    const { activeSlide, position: { prev, current } } = this.state;
    const totalSlides = this.props.slides.length - 1;
    // directions: 1 - right / -1 - left
    var direction = (prev - current) >= 0 ? 1 : -1;

    var nextSlide = activeSlide + direction;
    if (nextSlide <= 0) {
      nextSlide = 0
    } else if (nextSlide >= totalSlides) {
      nextSlide = totalSlides;
    }

    this._doSlide(nextSlide);
  }

  handleTouchMove(e) {
    if (e.touches.length !== 1) {
      return;
    }
    const { position: { prev: prevPos }, intervalId } = this.state;
    const { pageX: startPos = 0 } = this.state.initialTouch;
    const touch = e.touches[0];
    const { pageX: curPos, target: {clientWidth: width}} = touch;
    var delta = (startPos - curPos) / width * 100 - prevPos;

    // stops auto carousel play
    clearInterval(intervalId);

    this.setState({
      touch: touch,
      position: {
        current: -delta,
        prev: prevPos,
      }
    });
  }

  handleDotClick(pos) {
    this.setState({
      activeSlide: pos
    });
    this._doSlide(pos);
  }

  _doSlide(pos) {
    const offsetX = pos * 100;

    this._runAutoRotate();

    this.setState({
      position: {
        current: -offsetX,
        prev: -offsetX,
      }
    });
  }

  _runAutoRotate() {
    const { slides } = this.props;
    var { activeSlide, intervalId } = this.state;
    intervalId = clearInterval(intervalId) || setInterval(() => {
      let nextSlide = (activeSlide < slides.length - 1) ? ++activeSlide : 0;
      this.setState({
        activeSlide: nextSlide
      });
      this._doSlide(nextSlide);
    }, 5000);
    this.setState({intervalId});
  }

  render() {
    const { slides } = this.props;
    const { current: slidePos } = this.state.position;
    var styles = {
      sliderStyle: {
        transform: `translate(${slidePos}${window.innerWidth > 1440 ? '%' : 'vw'}, 0)`,
      },
      stageStyle: {
        width: `${slides.length * 100}vw`,
      }
    };

    return (
      <div className="slider-wrapper">
        <div
          className={'slider'}
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          onTouchCancel={this.handleTouchEnd.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          style={styles.sliderStyle}
        >
          <div className={'slider-outer'}>
            <div className={'slider-stage'} style={styles.stageStyle}>
              {slides ? slides.map((slide, i) =>
                <div
                  className={'slider-item'}
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL}/${slide.img})`}}
                  key={i}
                >
                  <div className="slider-promo-block container">
                    <h1 dangerouslySetInnerHTML={{__html: slide.title}}></h1>
                    <h3>{slide.date}</h3>
                    <p
                      className="slider-desc"
                      dangerouslySetInnerHTML={{__html: slide.desc}}
                    ></p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="slider-dots">
          {slides ? slides.map((slide, i) =>
            <div
              className={`slider-dot ${this.state.activeSlide === i ? 'active' : ''}`}
              onClick={this.handleDotClick.bind(this, i)}
              key={i}
            ><span></span></div>
          ) : null}
        </div>
      </div>
    );
  }

}


export default Slider;
