import { useState } from "react"
import styled from "styled-components"
import { breakpoints, gridBreakpoints } from "../utils/breakpoints"

interface BacklogGameData {
  id: number
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 15px 15px 0px;
  padding: 15px;
  color: white;
  background: ${props => props.theme.glass.black};
  box-shadow: ${props => props.theme.glass.shadow};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: ${props => props.theme.glass.blackBorder};
  transition: 0.3s;
  &:hover {
    background: ${props => props.theme.glass.blackHover};
  }
`

const StyledBacklogForm = styled.form`
  width: 80%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  h4 {
    margin: 0 0 10px 0;
  }
  fieldset {
    margin: 0 0 20px 0;
  }
`

const BacklogText = styled.fieldset`
  display: grid;
  ${gridBreakpoints("grid-template-columns", [
    { 0: "max-content auto" },
    { 800: "1fr 1fr 1fr 1fr" },
  ])}
  border: none;
  grid-gap: 10px;
  label {
    ${breakpoints("font-size", "rem", [{ 0: 0.75 }, { 800: 1.25 }])};
    text-align: right;
    margin-right: 15px;
  }
`

const BacklogDropdowns = styled.fieldset`
  display: grid;
  ${gridBreakpoints("grid-template-columns", [
    { 0: "max-content auto" },
    { 800: "1fr 1fr 1fr 1fr" },
  ])}
  border: none;
  grid-gap: 10px;
  label {
    ${breakpoints("font-size", "rem", [{ 0: 0.75 }, { 800: 1.25 }])};
    text-align: right;
    margin-right: 15px;
  }
`

const BacklogPlaytime = styled.fieldset`
  display: grid;
  ${gridBreakpoints("grid-template-columns", [
    { 0: "auto" },
    { 800: "1fr 1fr 1fr 1fr" },
  ])};
  border: none;
  grid-gap: 10px;
  label {
    ${breakpoints("font-size", "rem", [{ 0: 0.75 }, { 800: 1.25 }])};
    ${breakpoints("text-align", "", [{ 0: "left" }, { 800: "right" }])};
  }
`

export function NewBacklogGameForm({ addGame, setForm }) {
  const initialFormState = {
    game_title: "",
    sub_title: "",
    game_system: "",
    genre: "",
    dlc: "false",
    game_status: "Not Started",
    now_playing: "true",
    game_hours: null,
    game_minutes: null,
    actual_playtime: "false",
    add_date: null,
    start_date: null,
    beat_date: null,
    complete_date: null,
    game_notes: "",
  }
  const [game, setGame] = useState(initialFormState)

  function handleInputChange(event) {
    const { name, value } = event.target
    setGame({ ...game, [name]: value })
  }

  return (
    <GameDiv>
      <StyledBacklogForm
        onSubmit={event => {
          event.preventDefault()
          addGame(game)
        }}
      >
        <h4>Basics</h4>
        <BacklogText>
          <label htmlFor="game_title">Game Title</label>
          <input
            id="game_title"
            name="game_title"
            type="text"
            value={game.game_title}
            onChange={handleInputChange}
            autoComplete="game_title"
            required
          />
          <label htmlFor="sub_title">Sub Title</label>
          <input
            id="sub_title"
            name="sub_title"
            type="text"
            value={game.sub_title}
            onChange={handleInputChange}
            autoComplete="sub_title"
          />
          <label htmlFor="game_system">System</label>
          <input
            id="game_system"
            name="game_system"
            type="text"
            value={game.game_system}
            onChange={handleInputChange}
            autoComplete="game_system"
            required
          />

          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            name="genre"
            type="text"
            value={game.genre}
            onChange={handleInputChange}
            autoComplete="genre"
            required
          />
          <label htmlFor="dlc">DLC</label>
          <select
            id="dlc"
            name="dlc"
            value={game.dlc}
            onChange={handleInputChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false" selected>
              No
            </option>
          </select>
        </BacklogText>
        <h4>Current Status</h4>
        <BacklogDropdowns>
          <label htmlFor="game_status">Status</label>
          <select
            id="game_status"
            name="game_status"
            value={game.game_status}
            onChange={handleInputChange}
            required
          >
            <option value="Not Started" selected>
              Not Started
            </option>
            <option value="Started">Started</option>
            <option value="Beaten">Finished (Any%)</option>
            <option value="Completed">Finished (100%)</option>
            <option value="Mastered">Mastered</option>
            <option value="Infinite">Infinite</option>
            <option value="Wish List">Wish List</option>
          </select>
          <label htmlFor="now_playing">Now Playing</label>
          <select
            id="now_playing"
            name="now_playing"
            value={game.now_playing}
            onChange={handleInputChange}
            required
          >
            <option value="true" selected>
              Yes
            </option>
            <option value="false">No</option>
          </select>
        </BacklogDropdowns>
        <h4>Playtime</h4>
        <BacklogPlaytime>
          <label htmlFor="add_date">Date Acquired</label>
          <input
            id="add_date"
            name="add_date"
            type="date"
            value={game.add_date}
            onChange={handleInputChange}
            autoComplete="add_date"
          />
          <label htmlFor="start_date">Date Started</label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            value={game.start_date}
            onChange={handleInputChange}
            autoComplete="start_date"
          />
          <label htmlFor="beat_date">Date Beaten</label>
          <input
            id="beat_date"
            name="beat_date"
            type="date"
            value={game.beat_date}
            onChange={handleInputChange}
            autoComplete="beat_date"
          />
          <label htmlFor="complete_date">Date Completed</label>
          <input
            id="complete_date"
            name="complete_date"
            type="date"
            value={game.complete_date}
            onChange={handleInputChange}
            autoComplete="complete_date"
          />
          <label htmlFor="game_hours">Hours Played</label>
          <input
            id="game_hours"
            name="game_hours"
            type="number"
            value={game.game_hours}
            onChange={handleInputChange}
            autoComplete="game_hours"
            min="0"
          />
          <label htmlFor="game_minutes">Minutes Played</label>
          <input
            id="game_minutes"
            name="game_minutes"
            type="number"
            value={game.game_minutes}
            onChange={handleInputChange}
            autoComplete="game_minutes"
            min="0"
            max="59"
          />
          <label htmlFor="actual_playtime">Playtime Verified?</label>
          <select
            id="actual_playtime"
            name="actual_playtime"
            value={game.actual_playtime}
            onChange={handleInputChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false" selected>
              No
            </option>
          </select>
        </BacklogPlaytime>
        <label htmlFor="game_notes">Game Notes</label>
        <textarea
          id="game_notes"
          name="game_notes"
          value={game.game_notes}
          onChange={handleInputChange}
          defaultValue="Write whatever you want about the game here (usually I add a review or thoughts about the playthrough)."
        />
        <button type="submit">Add Game</button>
      </StyledBacklogForm>
      <button onClick={() => setForm({ visible: false, data: "" })}>
        Cancel Adding
      </button>
    </GameDiv>
  )
}

export function ExistingBacklogGame({
  gameData,
  loggedIn,
  updateGame,
  deleteGame,
}) {
  const [game, setGame] = useState(gameData)
  const [editing, setEditing] = useState(false)

  function handleInputChange(event) {
    const { name, value } = event.target
    setGame({ ...game, [name]: value })
    console.log(game)
  }

  if (!editing) {
    return (
      <GameDiv>
        <h4>{game.id}</h4>
        <h4>{game.game_title}</h4>
        <h5>{game.sub_title}</h5>
        {game.game_system} | {game.genre} | {game.game_status}
        <br />
        Now Playing: {game.now_playing.toString()} | DLC: {game.dlc.toString()}
        <br />
        Playtime: {game.game_hours} hours, {game.game_minutes} minutes
        <br />
        Added {game.add_date || ": N/A"}
        <br />
        Started {game.start_date || ": N/A"}
        <br />
        Beaten {game.beat_date || ": N/A"}
        <br />
        Completed {game.complete_date || ": N/A"}
        <br />
        <h6>{game.game_notes}</h6>
        {loggedIn && (
          <button onClick={() => setEditing(true)}>Edit game</button>
        )}
        {loggedIn && (
          <button onClick={() => deleteGame(game.id)}>Delete game</button>
        )}
      </GameDiv>
    )
  } else {
    return (
      <GameDiv>
        <StyledBacklogForm
          onSubmit={event => {
            event.preventDefault()
            console.log(game)
            updateGame(game.id, game)
            setGame(game)
            setEditing(false)
          }}
        >
          <h4>Basics</h4>
          <BacklogText>
            <label htmlFor="game_title">Game Title</label>
            <input
              id="game_title"
              name="game_title"
              type="text"
              value={game.game_title}
              onChange={handleInputChange}
              autoComplete="game_title"
              required
            />
            <label htmlFor="sub_title">Sub Title</label>
            <input
              id="sub_title"
              name="sub_title"
              type="text"
              value={game.sub_title}
              onChange={handleInputChange}
              autoComplete="sub_title"
            />
            <label htmlFor="game_system">System</label>
            <input
              id="game_system"
              name="game_system"
              type="text"
              value={game.game_system}
              onChange={handleInputChange}
              autoComplete="game_system"
              required
            />

            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              name="genre"
              type="text"
              value={game.genre}
              onChange={handleInputChange}
              autoComplete="genre"
              required
            />
            <label htmlFor="dlc">DLC</label>
            <select
              id="dlc"
              name="dlc"
              value={game.dlc}
              onChange={handleInputChange}
              required
            >
              <option value="true">Yes</option>
              <option value="false" selected>
                No
              </option>
            </select>
          </BacklogText>
          <h4>Current Status</h4>
          <BacklogDropdowns>
            <label htmlFor="game_status">Status</label>
            <select
              id="game_status"
              name="game_status"
              value={game.game_status}
              onChange={handleInputChange}
              required
            >
              <option value="Not Started" selected>
                Not Started
              </option>
              <option value="Started">Started</option>
              <option value="Beaten">Finished (Any%)</option>
              <option value="Completed">Finished (100%)</option>
              <option value="Mastered">Mastered</option>
              <option value="Infinite">Infinite</option>
              <option value="Wish List">Wish List</option>
            </select>
            <label htmlFor="now_playing">Now Playing</label>
            <select
              id="now_playing"
              name="now_playing"
              value={game.now_playing}
              onChange={handleInputChange}
              required
            >
              <option value="true" selected>
                Yes
              </option>
              <option value="false">No</option>
            </select>
          </BacklogDropdowns>
          <h4>Playtime</h4>
          <BacklogPlaytime>
            <label htmlFor="add_date">Date Acquired</label>
            <input
              id="add_date"
              name="add_date"
              type="date"
              value={game.add_date}
              onChange={handleInputChange}
              autoComplete="add_date"
            />
            <label htmlFor="start_date">Date Started</label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              value={game.start_date}
              onChange={handleInputChange}
              autoComplete="start_date"
            />
            <label htmlFor="beat_date">Date Beaten</label>
            <input
              id="beat_date"
              name="beat_date"
              type="date"
              value={game.beat_date}
              onChange={handleInputChange}
              autoComplete="beat_date"
            />
            <label htmlFor="complete_date">Date Completed</label>
            <input
              id="complete_date"
              name="complete_date"
              type="date"
              value={game.complete_date}
              onChange={handleInputChange}
              autoComplete="complete_date"
            />
            <label htmlFor="game_hours">Hours Played</label>
            <input
              id="game_hours"
              name="game_hours"
              type="number"
              value={game.game_hours}
              onChange={handleInputChange}
              autoComplete="game_hours"
              min="0"
            />
            <label htmlFor="game_minutes">Minutes Played</label>
            <input
              id="game_minutes"
              name="game_minutes"
              type="number"
              value={game.game_minutes}
              onChange={handleInputChange}
              autoComplete="game_minutes"
              min="0"
              max="59"
            />
            <label htmlFor="actual_playtime">Playtime Verified?</label>
            <select
              id="actual_playtime"
              name="actual_playtime"
              value={game.actual_playtime}
              onChange={handleInputChange}
              required
            >
              <option value="true">Yes</option>
              <option value="false" selected>
                No
              </option>
            </select>
          </BacklogPlaytime>
          <label htmlFor="game_notes">Game Notes</label>
          <textarea
            id="game_notes"
            name="game_notes"
            value={game.game_notes}
            onChange={handleInputChange}
            defaultValue="Write whatever you want about the game here (usually I add a review or thoughts about the playthrough)."
          />
          <button type="submit">Update Game</button>
        </StyledBacklogForm>
        <button onClick={() => setEditing(false)}>Cancel Editing</button>
      </GameDiv>
    )
  }
}
