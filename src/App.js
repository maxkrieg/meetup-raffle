import React, { Component } from 'react';
import bostonreactlogo from './boston-react-logo.jpg';
import './App.css';
import $ from 'jquery'

const URL = `https://api.meetup.com/ReactJS-Boston/events/239572732/rsvps?photo-host=public&sig_id=33956102&sig=a4d43e554b72e3da1435c24c32be7d5cdbc10f17`

class App extends Component {
  state = {
    rsvps: null,
    winner: null
  }

  handleGetRsvps = () => {
    this.setState({ requesting: true })
    $.ajax({
      dataType: 'jsonp',
      method: 'get',
      url: URL,
      success: (result) => {
        const rsvps = result.data.map((rsvp) => rsvp.member.name)
        this.setState({ rsvps })
      }
    });
  }

  handlePickWinner = () => {
    const rsvpCount = this.state.rsvps.length
    const winningIndex = Math.floor(Math.random() * rsvpCount) + 1
    const winner = this.state.rsvps[winningIndex]
    this.setState({ winner })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={bostonreactlogo} className="App-logo" alt="logo" />
          <h2 style={{ fontSize: '32px' }}>Pluralsight ReactJS Meetup Raffle!!</h2>
        </div>
        <p className="App-intro">
          One lucky winner will get a year of Pluralsight for FREE!
        </p>
        <p>{this.state.rsvps ? `Got ${this.state.rsvps.length} rsvps!` : 'No rsvps yet :('}</p>
        <button disabled={this.state.rsvps} onClick={this.handleGetRsvps}>Get RSVP list</button>
        <hr style={{ margin: '30px 20%' }}/>
        <button disabled={!this.state.rsvps} onClick={this.handlePickWinner}>Pick a winner!</button>
        <br/>
        <p style={{ fontSize: '32px' }}>
          {this.state.winner && this.state.winner.toUpperCase()}
        </p>
      </div>
    )
  }
}

export default App;
