import React, { Component } from 'react'
import "./style.css";
import axios from 'axios';

class Sport extends Component {

  state = {
    teamName: "",
    teamsBeaten: [],
    teamsArr: []
  }

  async componentDidMount() {
    this.setState({
      teamName: this.props.teamName
    });
    // get teams array
    try {
      const res = await axios.get('/api/news/sport');
      if (res.status === 200) {
        // get news headline and description
        const teamsArr = res.data;
        this.setState({
          teamsArr: teamsArr
        });
      }
    } catch (err) {
      console.log(err);
    }

    // get team list if user has already entered it
    // check teamsArr if there is a match
    // if it exists display the beaten teams
    const teamObj = this.state.teamsArr.find( obj => {
      return obj.teamName.toLowerCase() === this.state.teamName.toLowerCase();
    });
    if (teamObj !== undefined) {
      this.setState({
        teamsBeaten: teamObj.teamsBeaten
      });
    } else {
      this.setState({
        teamsBeaten: []
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // check teamsArr if there is a match
    // if it exists display the beaten teams
    const teamObj = this.state.teamsArr.find( obj => {
      return obj.teamName.toLowerCase() === e.target.value.toLowerCase();
    });
    if (teamObj !== undefined) {
      // pass team name data to dashboard
      // update parent (app) with sport data
      // update parent (dashboard) with news data
      this.props.triggerParentUpdate(e.target.value);
      this.setState({
        teamsBeaten: teamObj.teamsBeaten
      });
    } else {
      this.props.triggerParentUpdate("");
      this.setState({
        teamsBeaten: []
      });
    }
  }

  render() {
    const {teamName, teamsBeaten} = this.state;
    return (
      <div className="sport-item">
        <div className="sport-header">
          <h1>Champion's League Challenge</h1>
        </div>

        <div className="sport-form-container">
            <form className="sport-form">
              <div className="sport-form-group">
                <input 
                  type="text" 
                  name="teamName"
                  value={teamName}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Team Name"/>
              </div>
            </form>
        </div>

        <div className="sport-content">
          <h2>These are the teams you won against:</h2>
          <div className="teams-beaten">
            {
              teamsBeaten.map((val, ind) => {
                return <li key={ind}>{val}</li>
              })
            }
          </div>
        </div>


      </div>
    )
  }
}

export default Sport;