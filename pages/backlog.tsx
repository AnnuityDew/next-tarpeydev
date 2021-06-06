// https://github.com/nextauthjs/next-auth-example/blob/main/pages/protected.js
import { useState } from "react"
import Page from "../components/Page"
import { useSession, getSession } from "next-auth/client"
import { AppButton } from "../components/AppButtons"
import { ExistingBacklogGame, NewBacklogGameForm } from "../components/Backlog"
import { FilterButton } from "../components/FilterButtons"
import { FilterDiv } from "../components/FilterDiv"
import { BacklogDiv } from "../components/BacklogDiv"
import { BacklogNav } from "../components/BacklogNav"

export async function getServerSideProps(context) {
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
  return { props: { apiUrl: api, session: await getSession(context) } }
}

export default function BacklogAdmin({ apiUrl }) {
  const [session, loading] = useSession()
  const [backlog, setBacklog] = useState({
    visible: false,
    loading: false,
    data: "",
  })
  const [visual, setVisual] = useState({
    visible: false,
    loading: false,
    data: "",
  })
  const [search, setSearch] = useState(false)
  const [visualize, setVisualize] = useState(false)
  const [form, setForm] = useState({ visible: false, data: "" })
  const [filters, setFilters] = useState({
    dlcFilter: "",
    nowPlayingFilter: "",
    gameStatusFilter: "",
  })
  const loadingText = "Loading..."
  const subloadingText = "(takes a couple seconds!)"

  async function backlogRequested(queryFilter) {
    setBacklog({ visible: false, loading: true, data: "" })
    await Promise.all([
      fetch(apiUrl + `/haveyouseenx/annuitydew/search?${queryFilter}`, {
        method: "GET",
      })
        .then(response => {
          return response.json()
        })
        .then(jsonData => {
          return JSON.stringify(jsonData)
        })
        .then(jsonString => {
          setBacklog({ visible: true, loading: false, data: jsonString })
        }),
    ])
  }

  async function visualRequested(chartType) {
    setVisual({ visible: false, loading: true, data: "" })
    await Promise.all([
      fetch(apiUrl + `/haveyouseenx/annuitydew/charts/${chartType}`, {
        method: "GET",
      })
        .then(response => {
          return response.json()
        })
        .then(jsonData => {
          return JSON.stringify(jsonData)
        })
        .then(jsonString => {
          setVisual({ visible: true, loading: false, data: jsonString })
        }),
    ])
  }

  async function addGame(game) {
    var request = new Request(`${apiUrl}/haveyouseenx/annuitydew/game`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([game]),
    })
    fetch(request)
      .then(response => {
        if (response.status !== 200) {
          console.log("There was a problem! Code: " + response.status)
        }
        response.text().then(data => {
          console.log(data)
        })
      })
      .catch(e => {
        console.log("Fetch error =[", e)
      })
  }

  async function deleteGame(id) {
    var request = new Request(`${apiUrl}/haveyouseenx/annuitydew/game/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    })
    fetch(request)
      .then(response => {
        if (response.status !== 200) {
          console.log("There was a problem! Code: " + response.status)
        }
        response.text().then(data => {
          console.log(data)
        })
      })
      .catch(e => {
        console.log("Fetch error =[", e)
      })
  }

  async function updateGame(id, game) {
    var request = new Request(`${apiUrl}/haveyouseenx/annuitydew/game/${id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    })
    fetch(request)
      .then(response => {
        if (response.status !== 200) {
          console.log("There was a problem! Code: " + response.status)
        }
        response.text().then(data => {
          console.log(data)
        })
      })
      .catch(e => {
        console.log("Fetch error =[", e)
      })
  }

  async function onSearch() {
    setSearch(true)
    setVisualize(false)
    setForm({ visible: false, data: "" })
  }

  async function onVisualize() {
    setVisualize(true)
    setSearch(false)
    setForm({ visible: false, data: "" })
  }

  async function onAddGame() {
    setVisualize(false)
    setSearch(false)
    setForm({ visible: true, data: "" })
  }

  const appNavSection = (
    <BacklogNav>
      <AppButton
        onClick={onSearch}
        label="search"
        kind={search ? "darkPressed" : "dark"}
      />
      <AppButton
        onClick={onVisualize}
        label="visualize"
        kind={visualize ? "darkPressed" : "dark"}
      />
      {!!session && (
        <AppButton
          onClick={onAddGame}
          label={backlog["loading"] ? loadingText : "Add a game"}
          kind={form["visible"] ? "darkPressed" : "dark"}
        />
      )}
    </BacklogNav>
  )

  const searchSection = (
    <section>
      <h2>search</h2>
      <FilterDiv>
        <FilterButton
          kind="dark"
          label={backlog["loading"] ? loadingText : "Now Playing"}
          onClick={() => backlogRequested("now_playing=true")}
          disabled={backlog["loading"]}
        />
        <FilterButton
          kind="dark"
          label={backlog["loading"] ? loadingText : "Not Started"}
          onClick={() => backlogRequested("game_status=Not%20Started")}
          disabled={backlog["loading"]}
        />
        <FilterButton
          kind="dark"
          label={backlog["loading"] ? loadingText : "Started"}
          onClick={() => backlogRequested("game_status=Started")}
          disabled={backlog["loading"]}
        />
      </FilterDiv>
      <BacklogDiv>
        {backlog["visible"] &&
          JSON.parse(backlog["data"]).map((game, index) => (
            <ExistingBacklogGame
              key={index + 1}
              gameData={game}
              loggedIn={!!session}
              updateGame={updateGame}
              deleteGame={deleteGame}
            />
          ))}
      </BacklogDiv>
    </section>
  )

  const visualizeSection = (
    <section>
      <h2>visualize</h2>
      <FilterDiv>
        <FilterButton
          kind="dark"
          label={backlog["loading"] ? loadingText : "treemap"}
          onClick={() => visualRequested("treemap")}
          disabled={backlog["loading"]}
        />
        <FilterButton
          kind="dark"
          label={backlog["loading"] ? loadingText : "bubbles"}
          onClick={() => visualRequested("bubbles")}
          disabled={backlog["loading"]}
        />
        <FilterButton
          kind="dark"
          label={backlog["loading"] ? loadingText : "timeline"}
          onClick={() => visualRequested("timeline")}
          disabled={backlog["loading"]}
        />
      </FilterDiv>
      <div>{visual["visible"] && visual["data"]}</div>
    </section>
  )

  const newGameSection = (
    <section>
      <NewBacklogGameForm addGame={addGame} setForm={setForm} />
    </section>
  )

  return (
    <Page
      loggedIn={!!session}
      titleTwo=" - Dew's Backlog"
      description="A web app for viewing games, movies, and shows in my backlog."
      url="https://tarpey.dev/backlog"
      urlImage="https://tarpey.dev/backlog.png"
      heading="Dew's Backlog"
      subheading=""
    >
      <div>
        <p>Use the buttons below to look through my backlog of games.</p>
        {appNavSection}
        {search && searchSection}
        {visualize && visualizeSection}
        {form["visible"] && newGameSection}
      </div>
    </Page>
  )
}
