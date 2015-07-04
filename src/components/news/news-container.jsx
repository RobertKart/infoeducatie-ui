"use strict";

import $ from "jquery";
import _ from "lodash";
import React from "react";
import {Link} from "react-router";
import {Grid, Row, Col, Glyphicon} from "react-bootstrap";

import Article from "./article";
import "./news.less"


export default React.createClass({
  displayName: "NewsContainer",

  getInitialState() {
    return {
      hasError: false,
      currentNewsPage: 1,
      newsPerPage: 2,
      canShowNext: false,
      canShowPrevious: false,
      news: [],
      pinned: {}
    };
  },

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: window.config.API_URL + "news.json",
      success: this.onSuccess,
      error: this.onError
    });
  },

  onError() {
    this.setState({
      hasError: true
    });
  },

  onSuccess(data) {
    let news = data.filter((article) => {
      return !article.pinned;
    });

    this.setState({
      news: news,
      pinned: _.difference(data, news)[0],
      canShowNext: news.length > this.state.newsPerPage
    });
  },

  canShowNextPage() {
    return ((this.state.currentNewsPage + 1) * this.state.newsPerPage) <
            this.state.news.length;
  },

  canShowPreviousPage() {
    return this.state.currentNewsPage - 1 > 1;
  },

  showNextNewsPage() {
    if (this.state.currentNewsPage * this.state.newsPerPage <
        this.state.news.length) {
      this.setState({
        currentNewsPage: this.state.currentNewsPage + 1,
        canShowNext: this.canShowNextPage(),
        canShowPrevious: true
      });
    } else {
      this.setState({
        canShowNext: false,
        canShowPrevious: this.canShowPreviousPage()
      });
    }
  },

  showPreviousNewsPage() {
    if (this.state.currentNewsPage > 1) {
      this.setState({
        currentNewsPage: this.state.currentNewsPage - 1,
        canShowPrevious: this.canShowPreviousPage(),
        canShowNext: true
      });
    } else {
      this.setState({
        canShowPrevious: false,
        canShowNext: this.canShowNextPage()
      });
    }
  },

  renderNews() {
    let firstArticle = (this.state.currentNewsPage - 1) * this.state.newsPerPage;
    let news = _.clone(this.state.news).splice(firstArticle, this.state.newsPerPage);

    return news.map(function(article) {
      return <Article body={article.body}
                      title={article.title}
                      short={article.short}
                      created_at={article.created_at} />;
    });
  },

  renderPreviousPage() {
    let previousPageController = null;
    if (this.state.canShowPrevious) {
      previousPageController = <div className="pagination-icon"
                                    onClick={this.showPreviousNewsPage}>
                                 <Glyphicon glyph="chevron-left" />
                                 &nbsp;anterioare
                               </div>;
    }

    return <Col md={4} mdOffset={2}>{previousPageController}</Col>;
  },

  renderNextPage() {
    let nextPageController = null;
    if (this.state.canShowNext) {
      nextPageController = <div className="pagination-icon"
                                onClick={this.showNextNewsPage}>
                             următoare &nbsp;
                             <Glyphicon glyph="chevron-right" />
                           </div>;
    }

    return <Col md={4}>{nextPageController}</Col>;
  },

  renderPinnedArticle() {
    return <Row className="pinned-news">
      <Article body={this.state.pinned.body}
               title={this.state.pinned.title}
               short_description={this.state.pinned.short_description}
               created_at={this.state.pinned.created_at} />
    </Row>;
  },

  render() {
    return <Grid className="news-section">
      <Row>
          <Col xsOffset={1} xs={10} md={5} className="left">
              <Row className="xsmall-spacing" />
              <h6 id="news">Știri</h6>
              {this.renderPinnedArticle()}
          </Col>
          <Col xsOffset={1} xs={10} md={5} mdOffset={1} className="right">
            {this.renderNews()}
            <Row className="xsmall-spacing" />
            <Row>
              {this.renderPreviousPage()}
              {this.renderNextPage()}
            </Row>
          </Col>
      </Row>
      <Row className="xsmall-spacing" />
    </Grid>;
  }
});
