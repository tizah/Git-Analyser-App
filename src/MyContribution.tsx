import React, { Component } from "react";
import jsonData from "./Data.json";
import styled from "styled-components";

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10%;
`;

const Graph = styled.div`
  display: inline-grid;
  grid-template-areas:
    "empty months"
    "days squares";

  padding: 5rem;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  background-color: blanchedalmond;
`;

const Months = styled.ul`
  grid-area: months;
  display: grid;
  grid-template-columns:
    calc(var(--week-width) * 4) /* Jan */
    calc(var(--week-width) * 4) /* Feb */
    calc(var(--week-width) * 4) /* Mar */
    calc(var(--week-width) * 5) /* Apr */
    calc(var(--week-width) * 4) /* May */
    calc(var(--week-width) * 4) /* Jun */
    calc(var(--week-width) * 5) /* Jul */
    calc(var(--week-width) * 4) /* Aug */
    calc(var(--week-width) * 4) /* Sep */
    calc(var(--week-width) * 5) /* Oct */
    calc(var(--week-width) * 4) /* Nov */
    calc(var(--week-width) * 5) /* Dec */;
`;

const Squares = styled.ul`
  display: grid;
  grid-gap: var(--square-gap);
  grid-template-rows: repeat(7, var(--square-size));
  grid-auto-flow: column;
  grid-auto-columns: var(--square-size);
  li[data-level="1"] {
    background-color: #c6e48b;
  }
  li {
    background-color: #ebedf0;
  }
  li[data-level="2"] {
    background-color: #7bc96f;
  }
  li[data-level="3"] {
    background-color: #196127;
  }
`;

const Days = styled.ul`
  grid-area: days;
  display: grid;
  grid-gap: var(--square-gap);
  grid-template-rows: repeat(7, var(--square-size));
  grid-auto-flow: column;
  grid-auto-columns: var(--square-size);
  li:nth-child(odd) {
    visibility: hidden;
  }
`;

class Contributions extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      list: []
    };
  }
  handleInputChange = () => {
    // const name = this.search.value;
    const data = Array(jsonData);
    const mydata = data.find(x => x.david.name === this.search.value);
    const me = this.setState({ query: this.search.value });
    console.log(mydata);
  };
  search: any;
  list: string[] = [];
  componentDidMount() {
    for (var i = 1; i < 365; i++) {
      const level = Math.floor(Math.random() * 7);

      this.list.push(`<li key="${i}" data-level="${level}"></li>`);
      console.log(this.list);
    }
  }
  render() {
    return (
      <>
        <input
          type="text"
          className=""
          ref={input => (this.search = input)}
          placeholder="Enter your name"
        />
        <button onClick={this.handleInputChange} className="button">
          {" "}
          Search
        </button>
        <Graph>
          <Months>
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
          </Months>
          <Days>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </Days>
          <Squares>{this.list.map(x => x).flat}</Squares>
        </Graph>
      </>
    );
  }
}

export default Contributions;
