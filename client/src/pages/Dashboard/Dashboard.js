import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import './Dashboard.scss';
import axios from 'axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: {},
      searchError: {}
    };
  }

  deleteOpportunity(id, index) {
    axios.delete('/api/opportunities/' + id)
      .then(res => {
        let searchResult = this.state.searchResult;
        searchResult.items.splice(index, 1);
        this.setState({ searchResult });
      })
      .catch(err => {
        alert('Error Deleting');
      });
  }

  set(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    axios.get('/api/opportunities')
      .then(res => {
        this.setState({ searchResult: res.data });
      })
      .catch(err => {

      });
  }

  render () {
    const items = this.state.searchResult ? this.state.searchResult.items : [];

    return (
      <div>
        <h1>Dashboard</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Dashboard</li>
            <li className="breadcrumb-item active" aria-current="page"></li>
          </ol>
        </nav>
        <div className="card mb-3">
          <div className="card-header">
            Welcome back, Jordan!
          </div>
          <div className="card-body">
            <p>Add an opportunity below or, edit an existing one.</p>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Link className="btn btn-info" to="/dashboard/addopportunity">Add Opportunity</Link>
              <Link className="btn btn-info" to="/dashboard/addpartner">Add Partner (Admin)</Link>
              <Link className="btn btn-info">Add User (Admin)</Link>
            </div>
          </div>
        </div>
        <br/>
        <h4>Opportunities</h4>
        <SearchBar
          url="/api/opportunities"
          set={this.set.bind(this)}
        />
        <br/>
        <ul className="list-group">
          {items ? items.map(({ name, partner_name, id }, i) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {name} - {partner_name}
                <div>
                  <Link className="btn btn-info btn-sm">View</Link>
                  <Link className="btn btn-warning btn-sm" to={`/dashboard/editopportunity/${id}`}>Edit</Link>
                  <Link 
                    className="btn btn-danger btn-sm"
                    onClick={() => {this.deleteOpportunity(id, i)}}>
                    Delete
                  </Link>
                </div>
              </li>
            );
          }) : 'Loading...'}
        </ul>
      </div>
    );
  }
}