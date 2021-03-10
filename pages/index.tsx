import Page from "../components/Page"
import styled from "styled-components"
import { Component } from "react"
import { StyledButton } from "../components/Buttons"
import { Scorecard, BracketDiv } from "../components/Autobracket"
import { gridBreakpoints } from "../utils/breakpoints"

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

  roundLookup(gameIndex) {
    if (gameIndex <= 4) {
      return "First Four"
    } else if (gameIndex <= 36) {
      return "Round of 64"
    } else if (gameIndex <= 52) {
      return "Round of 32"
    } else if (gameIndex <= 60) {
      return "Sweet 16"
    } else if (gameIndex <= 64) {
      return "Elite Eight"
    } else if (gameIndex <= 66) {
      return "Final Four"
    } else if (gameIndex <= 67) {
      return "Title Game"
    } else {
      return "Error!"
    }
  }

  render() {
    let bracket, bracketForm, methodology, credits;
    let BracketGrid = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
    `
    let ButtonGrid = styled.div`
      display: grid;
      ${gridBreakpoints("grid-template-columns", [
        { 0: "1fr" },
        { 800: "1fr 1fr 1fr 1fr"}
      ])}
    `
    if (!this.state.viewBracket) {
      bracketForm = (
        <BracketDiv>
          <h4>How spicy would you like your bracket?</h4>
          <ButtonGrid>
            <StyledButton
              kind="vanilla"
              label="Vanilla (middle 20% of simulations)"
              click={this.bracketRequested.bind(this, "none")}
            />
            <StyledButton
              kind="mild"
              label="Mild (middle 50% of simulations)"
              click={this.bracketRequested.bind(this, "mild")}
            />
            <StyledButton
              kind="medium"
              label="Medium (middle 80% of simulations)"
              click={this.bracketRequested.bind(this, "medium")}
            />
            <StyledButton
              kind="max"
              label="MAX SPICE (hope you like outliers!)"
              click={this.bracketRequested.bind(this, "max")}
            />
          </ButtonGrid>
        </BracketDiv>
      )
      bracket = <div></div>
      methodology = <details>
        <summary>methodology</summary>
        <p>
          This is an automatic bracket generator for March Madness 2021. I've
          simulated each of the possible games in the bracket 1,000 times (full
          methodology coming soon). When you request a bracket, the app will
          choose from 1 of the 1,000 simulations for each game based on the
          level of spice you specify.
        </p>
      </details>
      credits = <details>
        <summary>credits</summary>
        <p>
          Special thanks to <a href="https://kenpom.com">Kenpom</a> for tempo
          data and <a href="https://fantasydata.com/">fantasydata</a> for their
          great API!
        </p>
      </details>

    } else {
      bracketForm = (
        <div>
          <button onClick={this.bracketReset.bind(this)}>
            Request a new bracket!
          </button>
        </div>
      )

      bracket = (
        <BracketGrid>
          {this.state.bracketData &&
            JSON.parse(this.state.bracketData).map((game, index) => (
              <Scorecard
                key={index + 1}
                gameIndex={index + 1}
                round={this.roundLookup(index + 1)}
                awaySeed={game.away_seed}
                awayTeam={game.away_team}
                homeSeed={game.home_seed}
                homeTeam={game.home_team}
                winner={game.sim_winner}
                margin={Math.abs(game.home_margin)}
                boxScoreId={game.sim_ObjectId}
              />
            ))}
        </BracketGrid>
      )
    }

    return (
      <Page>
        <h1>autobracket</h1>
        <h3>Automatic bracket generator for March Madness 2021.</h3>
        <section>{bracketForm}</section>
        <section>{bracket}</section>
        To learn more about this app, click the sections below.
        <section>{methodology}</section>
        <section>{credits}</section>
      </Page>
    )
  }
}

export default BracketGenerator
