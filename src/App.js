import React, { Component } from 'react';
import logo from '../public/img/logo.png';
import Slider from './Slider';
import NewsCard from './NewsCard';
import './App.css';
import data from './data.json'

class App extends Component {

  _calcMasonryCols() {
    return window.innerWidth <= 768 ? 2 : 3;
  }

  render() {
    const colCount = this._calcMasonryCols();
    var { news } = data;
    // sorts news by date
    news.sort((a, b) => -(a.timestamp - b.timestamp));

    return (
      <div className="app">
        <header className="app-nav navbar navbar-static-top">
          <div className="container">
            <div className="app-header">
              <a href="/" className="app-logo">
                <img src={logo} alt="logo" />
              </a>
              <nav className="navbar">
                <ul className="nav navbar-nav">
                  <li> <span>212.555.5555</span> </li>
                  <li> <a href="#" className="uppercase">Login</a> </li>
                  <li className="hamburger">
                    {[1, 2, 3].map(i => <span key={i}/>)}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <Slider slides={data.slides}/>

        <div className="container">
          <div className="row">
            <div className="news-wrapper">
              {Array.from({length: colCount}, (v, i) => i).map((el, colIdx) =>
                <div className={`news-col news-col-${colIdx}`} key={colIdx}>
                  {news ? news.map((itm, n) => {
                    let tmpIdx = colCount * n + colIdx;
                    return news[tmpIdx] ?
                      <NewsCard
                        img={news[tmpIdx].img}
                        title={news[tmpIdx].title}
                        timestamp={news[tmpIdx].timestamp}
                        key={tmpIdx}
                      /> : null}
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="app-footer">
          &copy; 2017 &mdash; <span className="uppercase">Sparta Plaesent</span>
          <a className="social-link" href="#">Instagram</a>
          <a className="social-link" href="#">Facebook</a>
          <a className="social-link" href="#">Twitter</a>
        </footer>
      </div>
    );
  }
}

export default App;
