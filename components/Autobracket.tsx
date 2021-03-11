import styled from "styled-components"
import { gridBreakpoints } from "../utils/breakpoints"

type ScorecardProps = {
  gameIndex: number
  round: string
  awaySeed: string
  awayTeam: string
  homeSeed: string
  homeTeam: string
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

let SeedSpan = styled.span`
  font-size: 65%;
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
  min-height: 300px;
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
  round,
  awaySeed,
  awayTeam,
  homeSeed,
  homeTeam,
  margin,
  winner,
  boxScoreId,
}: ScorecardProps) {
  let scorecard
  if (winner === awayTeam) {
    scorecard = (
      <ScorecardDiv round={round}>
        <h3>Game {gameIndex}</h3>
        <h3>{round}</h3>
        <GameDiv>
          <TeamDiv winner={true}>
            <SeedSpan>{awaySeed}</SeedSpan>
            <h2>{awayTeam}</h2>
            <span>Wins by {margin}</span>
          </TeamDiv>
          <TeamDiv winner={false}>
            <SeedSpan>{homeSeed}</SeedSpan>
            <h2>{homeTeam}</h2>
          </TeamDiv>
        </GameDiv>
        <h6>View box score: {boxScoreId}</h6>
      </ScorecardDiv>
    )
  } else {
    scorecard = (
      <ScorecardDiv round={round}>
        <h3>Game {gameIndex}</h3>
        <h3>{round}</h3>
        <GameDiv>
          <TeamDiv winner={false}>
            <SeedSpan>{awaySeed}</SeedSpan>
            <h2>{awayTeam}</h2>
          </TeamDiv>
          <TeamDiv winner={true}>
            <SeedSpan>{homeSeed}</SeedSpan>
            <h2>{homeTeam}</h2>
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
