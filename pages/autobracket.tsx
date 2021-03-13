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


// This gets called only on build
export async function getStaticProps() {
  // Fetch data from external API
  let api = ""
  if (process.env.API_ENV === "testing") {
    api = "http://127.0.0.1:8000"
  } else {
    api = "https://api.tarpey.dev"
  }

  // Pass data to the page via props
  return { props: { apiUrl: api } }
}


class BracketGenerator extends Component<
  { apiUrl: string },
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
      fetch(this.props.apiUrl + `/autobracket/bracket/2021/${selectedFlavor}`, {
        method: "GET",
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
          <h4>These buttons don't work yet. Come back on Selection Sunday!</h4>
          <ButtonGrid>
            <StyledButton
              gridButton={true}
              kind="vanilla"
              label="Vanilla"
              sublabel="(middle 20% of simulations)"
              click={this.bracketRequested.bind(this, "none")}
              disabled={true}
            />
            <StyledButton
              gridButton={true}
              kind="mild"
              label="Mild"
              sublabel="(middle 50% of simulations)"
              click={this.bracketRequested.bind(this, "mild")}
              disabled={true}
            />
            <StyledButton
              gridButton={true}
              kind="medium"
              label="Medium"
              sublabel="(middle 80% of simulations)"
              click={this.bracketRequested.bind(this, "medium")}
              disabled={true}
            />
            <StyledButton
              gridButton={true}
              kind="max"
              label="MAX SPICE"
              sublabel="(hope you like outliers!)"
              click={this.bracketRequested.bind(this, "max")}
              disabled={true}
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
              I've simulated each of the possible games in the bracket 1,000
              times, based on each player's 2021 stats. When you request a bracket,
              the app will choose from 1 of the 1,000 simulations for each game
              based on the level of spice you specify.
              If you'd like a deeper look at what's going on, feel free to check out
              this <ExternalLink href="https://medium.com/analytics-vidhya/march-madness-2021-simulating-a-bracket-part-1-7aa1cad69a65">series of blog posts</ExternalLink> I
              wrote on the model...or head over
              to <ExternalLink href="https://github.com/AnnuityDew/api-tarpeydev/blob/master/src/api/autobracket.py">GitHub</ExternalLink> and
              check out the full code!
            </p>
          </StyledDetails>
          <StyledDetails>
            <summary>credits</summary>
            <p>
              Special thanks to{" "}
              <ExternalLink href="https://kenpom.com">Kenpom</ExternalLink> for
              their tempo/efficiency data and{" "}
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
