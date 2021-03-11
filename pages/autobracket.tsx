import Page from "../components/Page"
import { Component } from "react"
import { StyledButton } from "../components/Buttons"
import {
  Scorecard,
  BracketDiv,
  BracketGrid,
  ButtonGrid,
  StyledDetails,
} from "../components/Autobracket"
import { ExternalLink } from "../components/ExternalLink"

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
    let bracket, bracketForm, appNotes, bracketReset
    if (!this.state.viewBracket) {
      bracketForm = (
        <BracketDiv>
          <h4>How spicy would you like your bracket?</h4>
          <ButtonGrid>
            <StyledButton
              gridButton={true}
              kind="vanilla"
              label="Vanilla"
              sublabel="(middle 20% of simulations)"
              click={this.bracketRequested.bind(this, "none")}
            />
            <StyledButton
              gridButton={true}
              kind="mild"
              label="Mild"
              sublabel="(middle 50% of simulations)"
              click={this.bracketRequested.bind(this, "mild")}
            />
            <StyledButton
              gridButton={true}
              kind="medium"
              label="Medium"
              sublabel="(middle 80% of simulations)"
              click={this.bracketRequested.bind(this, "medium")}
            />
            <StyledButton
              gridButton={true}
              kind="max"
              label="MAX SPICE"
              sublabel="(hope you like outliers!)"
              click={this.bracketRequested.bind(this, "max")}
            />
          </ButtonGrid>
        </BracketDiv>
      )
      bracket = <div></div>
      appNotes = (
        <div>
          To learn more about this app, click the sections below.
          <StyledDetails>
            <summary>methodology</summary>
            <p>
              This is an automatic bracket generator for March Madness 2021.
              I've simulated each of the possible games in the bracket 1,000
              times (full methodology coming soon). When you request a bracket,
              the app will choose from 1 of the 1,000 simulations for each game
              based on the level of spice you specify.
            </p>
          </StyledDetails>
          <StyledDetails>
            <summary>credits</summary>
            <p>
              Special thanks to{" "}
              <ExternalLink href="https://kenpom.com">Kenpom</ExternalLink> for
              tempo data and{" "}
              <ExternalLink href="https://fantasydata.com/">
                fantasydata
              </ExternalLink>{" "}
              for their great API!
            </p>
          </StyledDetails>
        </div>
      )
    } else {
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
      bracketReset = (
        <div>
          <h2>Don't like this bracket?</h2>
          <StyledButton
            gridButton={false}
            label="Request a new bracket"
            sublabel="(You will lose your current bracket!)"
            click={this.bracketReset.bind(this)}
          />
        </div>
      )
    }

    return (
      <Page
        titleTwo=" - autobracket"
        description="Mike Tarpey's March Madness bracket generator.
      This year's iteration includes a full Monte Carlo simulation program!"
        heading="autobracket"
        subheading="Automatic bracket generator for March Madness 2021."
      >
        <section>{bracketForm}</section>
        <section>{bracket}</section>
        <section>{bracketReset}</section>
        <section>{appNotes}</section>
      </Page>
    )
  }
}

export default BracketGenerator
