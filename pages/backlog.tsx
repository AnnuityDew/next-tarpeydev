// https://github.com/nextauthjs/next-auth-example/blob/main/pages/protected.js
import { useState } from "react"
import Page from "../components/Page"
import { useSession, getSession } from "next-auth/client"
import { StyledButton } from "../components/Buttons"
import { ExistingBacklogGame, NewBacklogGameForm } from "../components/Backlog"

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
  const [form, setForm] = useState({ visible: false, data: "" })
  const [filters, changeFilters] = useState({
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
        <BacklogNav />
        {!!session && (
          <StyledButton
            gridButton={false}
            kind="medium"
            label={backlog["loading"] ? loadingText : "Add a game"}
            sublabel={backlog["loading"] ? subloadingText : ""}
            click={() => setForm({ visible: true, data: "" })}
            disabled={backlog["loading"]}
          />
        )}
        <StyledButton
          gridButton={false}
          kind="blue"
          label={backlog["loading"] ? loadingText : "Now Playing"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => backlogRequested("now_playing=true")}
          disabled={backlog["loading"]}
        />
        <StyledButton
          gridButton={false}
          kind="blue"
          label={backlog["loading"] ? loadingText : "Not Started"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => backlogRequested("game_status=Not%20Started")}
          disabled={backlog["loading"]}
        />
        <StyledButton
          gridButton={false}
          kind="blue"
          label={backlog["loading"] ? loadingText : "Started"}
          sublabel={backlog["loading"] ? subloadingText : ""}
          click={() => backlogRequested("game_status=Started")}
          disabled={backlog["loading"]}
        />
      </div>
      <div>
        {form["visible"] ? <NewBacklogGameForm addGame={addGame} setForm={setForm} /> : null}
      </div>
      <div>
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
      </div>
    </Page>
  )
}
