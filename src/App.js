import React, { Component } from 'react'
import bostonreactlogo from './boston-react-logo.jpg'
import drumroll from './ferrelldrum.gif'
import './App.css'
import $ from 'jquery'

const URL = `https://api.meetup.com/ReactJS-Boston/events/239572732/rsvps?photo-host=public&sig_id=33956102&sig=a4d43e554b72e3da1435c24c32be7d5cdbc10f17`

class App extends Component {
  state = {
    rsvps: null,
    winner: null,
    signedUrl: URL,
    drum: null
  }

  handleInputChange = e => {
    this.setState({ signedUrl: e.target.value })
  }

  handleGetRsvps = () => {
    if (this.state.signedUrl) {
      $.ajax({
        dataType: 'jsonp',
        method: 'get',
        url: this.state.signedUrl,
        success: result => {
          const rsvps = result.data.map(rsvp => rsvp.member.name)
          this.setState({ rsvps })
        }
      })
    }
  }

  handlePickWinner = () => {
    const rsvpCount = this.state.rsvps.length
    const winningIndex = Math.floor(Math.random() * rsvpCount) + 1
    const winner = this.state.rsvps[winningIndex]

    if (!winner || this.state.winner === winner) this.handlePickWinner()
    else this.drumRoll(winner)
  }

  drumRoll = person => {
    this.setState({ drum: true })
    const winner = person
    const _this = this
    setTimeout(() => {
      this.setState({ winner, drum: false })
    }, 3000)
  }

  renderImage = () => {
    if (this.state.drum === null || !this.state.drum) return null
    else return <img src={drumroll} alt="drum roll" />
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={bostonreactlogo} className="App-logo" alt="logo" />
          <h2 style={{ fontSize: '32px' }}>
            Pluralsight ReactJS Meetup Raffle!!
          </h2>
        </div>
        <p className="App-intro">
          One lucky winner will get a year of Pluralsight for FREE!
        </p>
        <label style={{ margin: '25px 0' }}>
          Signed URL:<br />
          <input
            style={{ width: '90%', height: '40px', fontSize: '20px' }}
            value={this.state.signedUrl}
            onChange={this.handleInputChange}
          />
        </label>
        <p>
          {this.state.rsvps
            ? `Got ${this.state.rsvps.length} rsvps!`
            : 'No rsvps yet :('}
        </p>
        <button
          disabled={!this.state.signedUrl || this.state.rsvps}
          onClick={this.handleGetRsvps}
        >
          Get RSVP list
        </button>
        <hr style={{ margin: '30px 20%' }} />

        <a href="#winner">
          <button disabled={!this.state.rsvps} onClick={this.handlePickWinner}>
            Pick a winner!
          </button>
        </a>
        <br />

        <div style={{ marginTop: 50 }}>
          {this.state.winner
            ? <p style={{ fontSize: 36 }}>
                {' '}{this.state.winner.toUpperCase()}{' '}
              </p>
            : this.renderImage()}
        </div>
        <div style={{ paddingTop: 250 }} id="winner" />
      </div>
    )
  }
}

export default App
