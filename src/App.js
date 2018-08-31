import React, { Component } from "react";
// import "./stylesheets/styles.scss";

import Button from "./components/Button";
import Table from "./components/Table";

import { staffList, states } from "./DATA";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmployees: [],
      id: "",
      name: "",
      position: "",
      address: {
        street: "",
        state: "",
        zip: ""
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleStateSelection = this.handleStateSelection.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.mergeNewlyAcquired = this.mergeNewlyAcquired.bind(this);
    this.stateDropdown = this.stateDropdown.bind(this);
  }

  handleFormChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    let newEmployee = [{
      id: this.state.id,
      name: this.state.name,
      street: this.state.address.street,
      state: this.state.address.state,
      zip: this.state.address.zip,
      positions: this.state.position
    }];

    this.setState((prevState, props) => ({
      newEmployees: prevState.newEmployees.concat(newEmployee),
    }))
  }

  handleAddressChange = (e) => {
    this.setState({
      address: {
        ...this.state.address,
        [e.target.name]: e.target.value
      }
    })
  }

  handleStateSelection = (e) => {
    console.log(e.target);
    this.setState({
      address: {
        ...this.state.address,
        [e.target.name]: e.target.value
      }
    })
  }

  mergeNewlyAcquired = () => {
    return staffList.concat(this.state.newEmployees)
  }

  stateDropdown = () => {
    let options = states.map((item, index) => {
      return <option value={item} key={index}>{item}</option>
    });
    return (
      <select name="state" id="state" onChange={this.handleStateSelection}>
        {options}
      </select>
    );
  }

  render() {
    return (
      <div className="App staff-list-app">
        <div className="staff-form">
          <form className="pure-form">
            <ul className="form-controls">
              <li>
                <label htmlFor="id">ID: </label>
                  <input name="id" id="id" type="text" onChange={this.handleFormChange}/>
              </li>
              <li>
              <label htmlFor="name">Name: </label>
                <input name="name" id="name" type="text" onChange={this.handleFormChange}/>
              </li>
              <li>
              <label htmlFor="street">Street: </label>
                <input name="street" id="street" type="text" onChange={this.handleAddressChange}/>
              </li>
              <li className="state-dropdown">
              <label htmlFor="state">State: </label>
                {this.stateDropdown()}
              </li>
              <li>
              <label htmlFor="zip">Zip: </label>
                <input name="zip" id="zip" type="text" onChange={this.handleAddressChange}/>
              </li>
              <li>
              <label htmlFor="position">Position: </label>
                <input name="position" id="position" value={this.state.position} type="text" onChange={this.handleFormChange}/>
              </li>
              <li className="submit-button">
                <Button submit primaryStyle label="Add Employee" onClick={this.handleFormSubmit}/>
              </li>
            </ul>
          </form>
        </div>
        <div className="staff-list">
          <h1>Employee Directory</h1>
          <Table headers={["ID", "Name", "Street", "State", "Zip", "Position"]}  DATA={this.mergeNewlyAcquired()}/>
          <p>Being a front end position take home, this listing is not wired into a database. <br/>Employees can be added with the form on the left, changes will not persist.</p>
        </div>
      </div>
    );
  }
}

export default App;
