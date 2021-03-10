import App from "../components/App"
import { Component } from "react"
import { StyledButton } from "../components/Buttons"
import Scorecard from "../components/Scorecard"

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  let body = {
    grant_type: "client_credentials",
    scope: "all_data",
  }
  let api = ""
  if (process.env.API_ENV === "testing") {
    api = "http://127.0.0.1:8000"
  } else {
    api = "https://api.tarpey.dev"
  }
  const res = await fetch(api + "/security/token", {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: "Basic " + process.env.OKTA_ENCODED_ID_SECRET,
    },
    body: JSON.stringify(body),
  })
  const errorCode = res.ok ? false : res
  const jwtData = await res.json()

  // Pass data to the page via props
  return { props: { errorCode, token: jwtData["access_token"], apiUrl: api } }
}

class BracketGenerator extends Component<
  { token: string; apiUrl: string },
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
    await Promise.all([
      fetch(this.props.apiUrl + "/autobracket/bracket/2020/mild", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then(response => {
          return response.json()
        })
        .then(jsonData => {
          return JSON.stringify(jsonData)
        })
        .then(jsonString => {
          this.setState({
            bracketData: jsonString,
            viewBracket: true,
            bracketFlavor: selectedFlavor,
          })
        }),
    ])
  }

  bracketReset() {
    this.setState(state => ({
      bracketData: "",
      viewBracket: false,
      bracketFlavor: null,
    }))
  }

  render() {
    console.log(this.state.viewBracket);
    let bracketForm, bracket;
    if (!this.state.viewBracket) {
      bracketForm = (
        <div>
          <StyledButton
            label="Vanilla (middle 20% of simulations)"
            click={this.bracketRequested.bind(this, "none")}
          />
          <StyledButton
            label="Mild (middle 50% of simulations)"
            click={this.bracketRequested.bind(this, "mild")}
          />
          <StyledButton
            label="Medium (middle 80% of simulations)"
            click={this.bracketRequested.bind(this, "medium")}
          />
          <StyledButton
            label="MAX SPICE (hope you like outliers!)"
            click={this.bracketRequested.bind(this, "max")}
          />
        </div>
      )
      bracket = <div></div>
    } else {
      console.log(this.state.bracketData);
      bracketForm = (
        <div>
          <button onClick={this.bracketReset.bind(this)}>
            Request a new bracket!
          </button>
        </div>
      );
      bracket = (
        <div>
          {this.state.bracketData && (JSON.parse(this.state.bracketData)).map(game => (
            <Scorecard
              awaySeed={game.away_seed}
              awayTeam={game.away_team}
              homeSeed={game.home_seed}
              homeTeam={game.home_team}
              winner={game.sim_winner}
              margin={Math.abs(game.home_margin)}
            />
          ))}
        </div>
      );
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
