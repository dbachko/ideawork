/**
 * News Card component
 *
 */

import React from 'react';
import './NewsCard.css';

class NewsCard extends React.Component {

  render() {
    var dateFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const { img, title, timestamp } = this.props;
    const date = new Date(timestamp * 1000);
    const dateStr = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date);

    return (
      <div className={'news-card'}>
        <div className={'news-card-img'}>
          <img src={`${process.env.PUBLIC_URL}/${img}`} href="#" role="presentation"/>
        </div>
        <span className={'news-card-date uppercase'}>{dateStr}</span>
        <h1 className={'news-card-title'}>{title}</h1>
        <span className={'news-card-links'}>Presented by <a href="#" className="uppercase">Lorem Ipsulum</a></span>
      </div>
    );
  }

}


export default NewsCard;
