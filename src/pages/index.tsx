import App from "../components/App"
import { Component } from "react"

class BracketGenerator extends Component<
  {},
  { viewBracket: boolean; bracketFlavor: string; bracketData: string }
> {
  constructor(props) {
    super(props)

    this.state = {
      viewBracket: false,
      bracketFlavor: null,
      bracketData: "",
    }
  }
  async bracketRequested(selectedFlavor) {
    var api = ""
    if (process.env.NEXT_PUBLIC_API_ENV) {
      api = process.env.NEXT_PUBLIC_API_ENV
    } else {
      api = "http://127.0.0.1:8000"
    };
    let data = await Promise.all([
      fetch(api + "/autobracket/bracket/2020/mild", {
        method: "GET",
        headers: {
          accept: "application/json",
          "next-tarpeydev-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.setState(state => ({
            bracketData: JSON.stringify(data),
            viewBracket: true,
            bracketFlavor: selectedFlavor,
          }))
        }),
    ])
  }

  bracketReset() {
    this.setState(state => ({
      viewBracket: false,
      bracketFlavor: null,
    }))
  }

  render() {
    let bracketForm, bracket
    if (!this.state.viewBracket) {
      bracketForm = (
        <div>
          <button onClick={this.bracketRequested.bind(this, "none")}>
            Vanilla (middle 20% of simulations)
          </button>
          <button onClick={this.bracketRequested.bind(this, "mild")}>
            Mild (middle 50% of simulations)
          </button>
          <button onClick={this.bracketRequested.bind(this, "medium")}>
            Medium (middle 80% of simulations)
          </button>
          <button onClick={this.bracketRequested.bind(this, "max")}>
            MAX SPICE (hope you like outliers!)
          </button>
        </div>
      )
      bracket = ""
    } else {
      bracketForm = (
        <div>
          <button onClick={this.bracketReset.bind(this)}>
            Request a new bracket!
          </button>
        </div>
      )
      bracket = (
        <div>
          {JSON.parse(this.state.bracketData).map(game => (
            <p>
              {game.away_seed} {game.away_team} vs. {game.home_seed}{" "}
              {game.home_team}. {game.sim_winner} wins by{" "}
              {Math.abs(game.home_margin)}!
            </p>
          ))}
        </div>
      )
    }

    return (
      <App>
        <p>
          This is an automatic bracket generator for March Madness 2021. I've
          simulated each of the possible games in the bracket 1,000 times (full
          methodology coming soon). When you request a bracket, the app will
          choose from 1 of the 1,000 simulations for each game based on the
          level of spice you specify.
        </p>

        <p>
          Special thanks to <a href="https://kenpom.com">Kenpom</a> for tempo
          data and <a href="https://fantasydata.com/">fantasydata</a> for their
          great API!
        </p>

        <span>How spicy would you like your bracket?</span>
        <div className="form-container">{bracketForm}</div>
        <div className="bracket-container">{bracket}</div>
      </App>
    )
  }
}

export default BracketGenerator
