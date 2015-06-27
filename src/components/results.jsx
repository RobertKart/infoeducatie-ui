"use strict";

import React from "react";
import { Grid, Col, Row, Table } from "react-bootstrap";

import Header from "./header";
import FilterIcon from "./contestants/filter_icon";

import "./results.less";


export default React.createClass({
  displayName: "Results",

  getInitialState: function() {
    return {
      currentCategory: "educational",
      results: {
        educational: [
          { rank: "I",
            project: {
              id: 1,
              name: "Quizrl",
              authors: [{id: 1, name: "Lacătușu Casian"}],
              school: "Colegiul Național Traian",
              score: 68.43,
              open: 78.96,
              total: 73.70
            }
          },
          { rank: "II",
            project: {
              id: 2,
              name: "Nexus Play",
              authors: [{id: 2, name: "Cristian Alexandru"},
                        {id: 3, name: "Ghinea Diana-Elena"}],
              school: "Colegiul Național de Informatică „Tudor Vianu”",
              score: 68.21,
              open: 78.11,
              total: 73.16
            }
          },
          { rank: "III",
            project: {
              id: 3,
              name: "Locatia Mea",
              authors: [{id: 4, name: "Cozloschi Florin"}],
              school: "Liceul Teoretic 'Traian Vuia' Faget",
              score: 67.93,
              open: 75.54,
              total: 71.74
            }
          }
        ]
      }
    };
  },

  toggleCategory(category) {
    this.setState({
      currentCategory: category
    });
  },

  renderTable() {
    return <Grid className="results-section">
      <Row>
        <Col mdOffset={1} md={10}>
          <Table responsive>
            <thead>
              <tr>
                <th>premiul</th>
                <th>numele lucrării</th>
                <th>concurent</th>
                <th>liceu</th>
                <th>punctaj</th>
                <th>open</th>
                <th>total</th>
              </tr>
            </thead>
            {this.state.results[this.state.currentCategory].map(function(result) {
              return <tr key={result.project.id}>
                <td className="rank">{result.rank}</td>
                <td>{result.project.name}</td>
                <td>
                  <ul className="list-unstyled">
                    {result.project.authors.map(function(author){
                        return <li className="author" key={author.id}>
                          {author.name}
                        </li>;
                      })}
                  </ul>
                </td>
                <td>{result.project.school}</td>
                <td>{result.project.score}</td>
                <td>{result.project.open}</td>
                <td>{result.project.total}</td>
              </tr>;
            })}
          </Table>
        </Col>
      </Row>
    </Grid>;
  },

  render() {
    return <div className="results">
      <div className="blue-section-wrapper">
        <Grid className="blue-section">
          <Header isLoggedIn={this.props.isLoggedIn} />
          <Row className="xsmall-spacing" />
          <Row>
            <Col>
              <h1>Rezultate InfoEducație</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Concurs Național de Informatică</h2>
            </Col>
          </Row>
          <Row className="big-spacing" />
        </Grid>
      </div>

      <Grid>
        <Row className="small-spacing" />
        <Row className="filter-buttons">
          <Col smOffset={3} sm={1} xs={2} xsOffset={1}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="educational" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="media" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="robots" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="utility" />
          </Col>
          <Col sm={1} xs={2}>
            <FilterIcon currentCategory={this.state.currentCategory}
                        toggleCategory={this.toggleCategory}
                        category="web" />
          </Col>
        </Row>
        <Row className="small-spacing" />
      </Grid>
      {this.renderTable()}
    </div>;
  }
});
