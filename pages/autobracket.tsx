import Page from "../components/Page"
import { Component } from "react"
import { StyledButton } from "../components/Buttons"
import {
  Instructions,
  FirstFour,
  FirstFourGrid,
  RegionsContainer,
  HalfRegion,
  MiniScorecard,
  BracketDiv,
  ButtonGrid,
  SevenGameGrid,
  StyledDetails,
  TeamBoxScorecard,
  PlayerBoxScorecard,
  PlayerBoxGrid,
} from "../components/Autobracket"
import { ExternalLink } from "../components/ExternalLink"

// This gets called only on build
export async function getStaticProps() {
  // Fetch data from external API
  let api = ""
  if (process.env.API_ENV === "test") {
    api = "http://127.0.0.1:8000"
  } else if (process.env.API_ENV === "dev") {
    api = "https://dev.tarpey.dev"
  } else {
    api = "https://api.tarpey.dev"
  }

  // Pass data to the page via props
  return { props: { apiUrl: api } }
}

class BracketGenerator extends Component<
  { apiUrl: string },
  {
    viewBracket: boolean
    viewBoxScore: boolean
    bracketFlavor: string
    bracketData: string
    boxScoreData: string
    vanillaLoading: boolean
    mildLoading: boolean
    mediumLoading: boolean
    maxLoading: boolean
  }
> {
  constructor(props) {
    super(props)

    this.state = {
      viewBracket: false,
      viewBoxScore: false,
      bracketFlavor: null,
      bracketData: "",
      boxScoreData: "",
      vanillaLoading: false,
      mildLoading: false,
      mediumLoading: false,
      maxLoading: false,
    }
  }

  async bracketRequested(selectedFlavor) {
    if (selectedFlavor === "none") {
      this.setState(state => ({ vanillaLoading: true }))
    } else if (selectedFlavor === "mild") {
      this.setState(state => ({ mildLoading: true }))
    } else if (selectedFlavor === "medium") {
      this.setState(state => ({ mediumLoading: true }))
    } else if (selectedFlavor === "max") {
      this.setState(state => ({ maxLoading: true }))
    }
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
      boxScoreData: "",
      viewBracket: false,
      viewBoxScore: false,
      bracketFlavor: null,
      vanillaLoading: false,
      mildLoading: false,
      mediumLoading: false,
      maxLoading: false,
    }))
  }

  async boxScoreRequested(boxScoreId) {
    await Promise.all([
      fetch(this.props.apiUrl + `/autobracket/game/${boxScoreId}`, {
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
            boxScoreData: jsonString,
            viewBracket: false,
            viewBoxScore: true,
          })
        }),
    ])
  }

  boxScoreReset() {
    this.setState(state => ({
      viewBracket: true,
    }))
  }

  roundLookup(gameIndex) {
    if (gameIndex <= 4) {
      return " - First Four"
    } else if (gameIndex <= 36) {
      return " - Round of 64"
    } else if (gameIndex <= 52) {
      return " - Round of 32"
    } else if (gameIndex <= 60) {
      return " - Sweet 16"
    } else if (gameIndex <= 64) {
      return " - Elite Eight"
    } else if (gameIndex <= 66) {
      return ""
    } else if (gameIndex <= 67) {
      return ""
    } else {
      return "Error!"
    }
  }

  regionLookup(game, regionList) {
    return regionList.includes(game)
  }

  render() {
    const firstFourInfo = {
      "First Four": [0, 1, 2, 3],
    }
    const regionInfo = {
      "West Upper": [4, 5, 6, 7, 36, 37, 52],
      "West Lower": [8, 9, 10, 11, 38, 39, 53],
      "East Upper": [12, 13, 14, 15, 40, 41, 54],
      "East Lower": [16, 17, 18, 19, 42, 43, 55],
      "South Upper": [20, 21, 22, 23, 44, 45, 56],
      "South Lower": [24, 25, 26, 27, 46, 47, 57],
      "Midwest Upper": [28, 29, 30, 31, 48, 49, 58],
      "Midwest Lower": [32, 33, 34, 35, 50, 51, 59],
      "Elite Eight": [60, 61, 62, 63, 64, 65, 66, 67],
    }
    let bracket, bracketForm, appNotes, bracketReset, boxScore, returnToBracket
    const loading = "Loading..."
    const subloading = "(takes a couple seconds!)"
    {
      /* button labels change after click and become disabled. all buttons disable when one is clicked */
    }
    if (!this.state.viewBracket && !this.state.viewBoxScore) {
      bracketForm = (
        <BracketDiv>
          <h4>How spicy would you like your bracket?</h4>
          <ButtonGrid>
            <StyledButton
              gridButton={true}
              kind="vanilla"
              label={this.state.vanillaLoading ? loading : "Vanilla"}
              sublabel={
                this.state.vanillaLoading
                  ? subloading
                  : "(middle 20% of simulations)"
              }
              click={this.bracketRequested.bind(this, "none")}
              disabled={
                this.state.vanillaLoading ||
                this.state.mildLoading ||
                this.state.mediumLoading ||
                this.state.maxLoading
              }
            />
            <StyledButton
              gridButton={true}
              kind="mild"
              label={this.state.mildLoading ? loading : "Mild"}
              sublabel={
                this.state.mildLoading
                  ? subloading
                  : "(middle 50% of simulations)"
              }
              click={this.bracketRequested.bind(this, "mild")}
              disabled={
                this.state.vanillaLoading ||
                this.state.mildLoading ||
                this.state.mediumLoading ||
                this.state.maxLoading
              }
            />
            <StyledButton
              gridButton={true}
              kind="medium"
              label={this.state.mediumLoading ? loading : "Medium"}
              sublabel={
                this.state.mediumLoading
                  ? subloading
                  : "(middle 80% of simulations)"
              }
              click={this.bracketRequested.bind(this, "medium")}
              disabled={
                this.state.vanillaLoading ||
                this.state.mildLoading ||
                this.state.mediumLoading ||
                this.state.maxLoading
              }
            />
            <StyledButton
              gridButton={true}
              kind="max"
              label={this.state.maxLoading ? loading : "MAX SPICE"}
              sublabel={
                this.state.maxLoading ? subloading : "(hope you like outliers!)"
              }
              click={this.bracketRequested.bind(this, "max")}
              disabled={
                this.state.vanillaLoading ||
                this.state.mildLoading ||
                this.state.mediumLoading ||
                this.state.maxLoading
              }
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
              times, based on each player's 2021 stats. When you request a
              bracket, the app will choose from 1 of the 1,000 simulations for
              each game based on the level of spice you specify. If you'd like a
              deeper look at what's going on, feel free to check out this{" "}
              <ExternalLink href="https://medium.com/analytics-vidhya/march-madness-2021-simulating-a-bracket-part-1-7aa1cad69a65">
                series of blog posts
              </ExternalLink>{" "}
              I wrote on the model...or head over to{" "}
              <ExternalLink href="https://github.com/AnnuityDew/api-tarpeydev/blob/master/src/api/autobracket.py">
                GitHub
              </ExternalLink>{" "}
              and check out the full code!
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
    } else if (this.state.viewBracket) {
      bracket = (
        <section>
          <Instructions hot={false}>
            Your simulated bracket is below! Use this to fill out an empty
            bracket on any site you're competing on.
          </Instructions>
          <Instructions hot={true}>
            NEW THIS YEAR: you can click on any game in the bracket to view its
            simulated box score!
          </Instructions>
          <FirstFour region="First Four">
            <FirstFourGrid>
              {this.state.bracketData &&
                JSON.parse(this.state.bracketData)
                  .filter((game, index) =>
                    firstFourInfo["First Four"].includes(index)
                  )
                  .map((game, index) => (
                    <MiniScorecard
                      click={this.boxScoreRequested.bind(
                        this,
                        game.sim_ObjectId
                      )}
                      key={index + 1}
                      gameData={game}
                      gameIndex={index + 1}
                      round={this.roundLookup(index + 1)}
                    />
                  ))}
            </FirstFourGrid>
          </FirstFour>
          <RegionsContainer>
            {Object.keys(regionInfo).map(region => (
              <HalfRegion key={region} region={region}>
                <SevenGameGrid>
                  {this.state.bracketData &&
                    JSON.parse(this.state.bracketData)
                      .filter((game, index) =>
                        regionInfo[region].includes(index)
                      )
                      .map((game, index) => (
                        <MiniScorecard
                          click={this.boxScoreRequested.bind(
                            this,
                            game.sim_ObjectId
                          )}
                          key={index + 1}
                          cssGame={"game".concat((index + 1).toString())}
                          gameData={game}
                          gameIndex={index + 1}
                          round={this.roundLookup(index + 1)}
                        />
                      ))}
                </SevenGameGrid>
              </HalfRegion>
            ))}
          </RegionsContainer>
        </section>
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
    } else if (this.state.viewBoxScore) {
      boxScore = (
        <div>
          {JSON.parse(this.state.boxScoreData).map((data, index) => (
            <TeamBoxScorecard key={index} teamData={data["team_box_score"]} />
          ))}
          <PlayerBoxGrid>
            {JSON.parse(this.state.boxScoreData).map((data, index) =>
              Object.keys(data["full_box_score"]).map((player, index) => (
                <PlayerBoxScorecard
                  key={index}
                  index={index}
                  team={Object.keys(data["full_box_score"])}
                  playerData={data["full_box_score"][player]}
                />
              ))
            )}
          </PlayerBoxGrid>
        </div>
      )
      returnToBracket = (
        <StyledButton
          gridButton={false}
          label="Return to the bracket I made"
          click={this.boxScoreReset.bind(this)}
        />
      )
    }

    return (
      <Page
        titleTwo=" - autobracket"
        description="Mike Tarpey's March Madness bracket generator.
      This year's iteration includes a full Monte Carlo simulation program!"
        url="https://tarpey.dev/autobracket"
        urlImage="https://tarpey.dev/autobracket.png"
        heading="autobracket"
        subheading="Automatic bracket generator for March Madness 2021."
      >
        <section>{bracketForm}</section>
        {bracket}
        <section>{bracketReset}</section>
        <section>{appNotes}</section>
        <section>{returnToBracket}</section>
        <section>{boxScore}</section>
        <section>{returnToBracket}</section>
      </Page>
    )
  }
}

export default BracketGenerator
