import styled from "styled-components"
import { gridBreakpoints } from "../utils/breakpoints"

type ScorecardProps = {
  gameIndex: number
  region: string
  round: string
  awaySeed: string
  awaySchool: string
  homeSeed: string
  homeSchool: string
  winner: string
  margin: number
  boxScoreId: string
}

let GameDiv = styled.div`
  place-self: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

let TeamDiv = styled.div`
  margin: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 5px;
  display: grid;
  place-items: center center;
  grid-template-rows: 1fr 1fr 1fr;
  background: ${props =>
    props.winner
      ? "conic-gradient(from -270deg at 75% 110%, midnightblue, lawngreen)"
      : "conic-gradient(from -90deg at top left, black, white)"};
`

export const BracketDiv = styled.div`
  background: ${props => props.theme.uconn.c700};
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
`

export const BracketGrid = styled.div`
  padding: 10px 0;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
`

/* conditional CSS: https://stackoverflow.com/a/56098044 */
let ScorecardDiv = styled.section`
  min-height: 360px;
  height: 30vh;
  display: grid;
  place-items: center center;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  grid-template-rows: 1fr 1fr 4fr 1fr;
  ${props => {
    if (props.round === "First Four") {
      return `
        background: ${props.theme.rainbow.lb};
      `
    } else if (props.round === "Round of 64") {
      return `
        background: ${props.theme.rainbow.db};
      `
    } else if (props.round === "Round of 32") {
      return `
        background: ${props.theme.rainbow.purple};
      `
    } else if (props.round === "Sweet 16") {
      return `
        background: ${props.theme.rainbow.pink};
      `
    } else if (props.round === "Elite Eight") {
      return `
        background: ${props.theme.rainbow.red};
      `
    } else if (props.round === "Final Four") {
      return `
        background: ${props.theme.rainbow.orange};
      `
    } else if (props.round === "Title Game") {
      return `
        background: ${props.theme.rainbow.yellow};
      `
    }
  }}
`

export function Scorecard({
  gameIndex,
  region,
  round,
  awaySeed,
  awaySchool,
  homeSeed,
  homeSchool,
  margin,
  winner,
  boxScoreId,
}: ScorecardProps) {
  let scorecard
  if (winner === awaySchool) {
    scorecard = (
      <ScorecardDiv round={round}>
        <h3>Game {gameIndex}</h3>
        <h4>{region} - {round}</h4>
        <GameDiv>
          <TeamDiv winner={true}>
            <h3>{awaySeed}</h3>
            <h4>{awaySchool}</h4>
            <span>Wins by {margin}</span>
          </TeamDiv>
          <TeamDiv winner={false}>
            <h3>{homeSeed}</h3>
            <h2>{homeSchool}</h2>
          </TeamDiv>
        </GameDiv>
        <h6>View box score: {boxScoreId}</h6>
      </ScorecardDiv>
    )
  } else {
    scorecard = (
      <ScorecardDiv round={round}>
        <h3>Game {gameIndex}</h3>
        <h4>{region} - {round}</h4>
        <GameDiv>
          <TeamDiv winner={false}>
            <h3>{awaySeed}</h3>
            <h4>{awaySchool}</h4>
          </TeamDiv>
          <TeamDiv winner={true}>
            <h3>{homeSeed}</h3>
            <h4>{homeSchool}</h4>
            <span>Wins by {margin}</span>
          </TeamDiv>
        </GameDiv>
        <h6>View box score: {boxScoreId}</h6>
      </ScorecardDiv>
    )
  }

  return scorecard
}

export const ButtonGrid = styled.div`
  display: grid;
  ${gridBreakpoints("grid-template-columns", [
    { 0: "1fr" },
    { 800: "1fr 1fr 1fr 1fr" },
  ])}
`

export const StyledDetails = styled.details`
  margin: 20px 0;
`
