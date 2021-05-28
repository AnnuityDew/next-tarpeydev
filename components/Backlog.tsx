import styled from "styled-components"
import { StyledButton } from "./Buttons"

interface BacklogGameData {
  game_title: string
  sub_title: string
  game_system: string
  genre: string
  dlc: boolean
  now_playing: boolean
  game_status: string
  game_hours: number
  game_minutes: number
  actual_playtime: boolean
  add_date: string
  start_date: string
  beat_date: string
  complete_date: string
  game_notes: string
}

interface BacklogGameProps {
  gameData: BacklogGameData
}

export const GameDiv = styled.div`
  background: ${props => props.theme.uconn.c700};
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  label {
    text-align: right;
    margin-right: 15px;
    width: 25%;
  }
  form {
    max-width: 1000px;
  }
  form label
`

export function BacklogGame({ gameData }: BacklogGameProps) {
  return (
    <GameDiv>
      <h4>{gameData.game_title}</h4>
      <h5>{gameData.sub_title}</h5>
      {gameData.game_system} | {gameData.genre} | {gameData.game_status}<br />
      Now Playing: {gameData.now_playing.toString()} | DLC: {gameData.dlc.toString()}<br />
      Playtime: {gameData.game_hours} hours, {gameData.game_minutes} minutes<br />
      Added {gameData.add_date || ": N/A"}<br />
      Started {gameData.start_date || ": N/A"}<br />
      Beaten {gameData.beat_date || ": N/A"}<br />
      Completed {gameData.complete_date || ": N/A"}<br />
      <h6>{gameData.game_notes}</h6>
    </GameDiv>
  )
}

const StyledBacklogForm = styled.form`
  display: flex;
`

const BacklogBasics = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

export function BacklogGameForm() {
  return (
    <GameDiv>
      <StyledBacklogForm>
        <fieldset>
          <label htmlFor="game_title">Game Title</label>
          <input id="game_title" name="game_title" type="text" autoComplete="game_title" required />
          <label htmlFor="sub_title">Sub Title</label>
          <input id="sub_title" name="sub_title" type="text" autoComplete="sub_title" required />
          <label htmlFor="game_system">System</label>
          <input id="game_system" name="game_system" type="text" autoComplete="game_system" required />
          <label htmlFor="genre">Genre</label>
          <input id="genre" name="genre" type="text" autoComplete="genre" required />
          <label htmlFor="game_status">Status</label>
          <select id="game_status" name="game_status" required>
            <option value="Not Started">Not Started</option>
            <option value="Started">Started</option>
            <option value="Beaten">Finished (Any%)</option>
            <option value="Completed">Finished (100%)</option>
            <option value="Mastered">Mastered</option>
            <option value="Infinite">Infinite</option>
            <option value="Wish List">Wish List</option>
          </select>
          <label htmlFor="now_playing">Now Playing</label>
          <select id="now_playing" name="now_playing" required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="dlc">DLC</label>
          <select id="dlc" name="dlc" required>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="game_hours">Hours Played</label>
          <input id="game_hours" name="game_hours" type="number" autoComplete="game_hours" min="0" required />
          <label htmlFor="game_minutes">Minutes Played</label>
          <input id="game_minutes" name="game_minutes" type="number" autoComplete="game_minutes" min="0" max="59" required />
          <label htmlFor="add_date">Date Acquired</label>
          <input id="add_date" name="add_date" type="date" autoComplete="add_date" required />
          <label htmlFor="start_date">Date Started</label>
          <input id="start_date" name="start_date" type="date" autoComplete="start_date" required />
          <label htmlFor="beat_date">Date Beaten</label>
          <input id="beat_date" name="beat_date" type="date" autoComplete="beat_date" required />
          <label htmlFor="complete_date">Date Completed</label>
          <input id="complete_date" name="complete_date" type="date" autoComplete="complete_date" required />
          <label htmlFor="game_notes">Game Notes</label>
          <textarea id="game_notes" name="game_notes">Test</textarea>
        </fieldset>
        <button type="submit">Add Game</button>
      </StyledBacklogForm>
    </GameDiv>
  )
}