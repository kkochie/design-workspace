import React, { useEffect, useState } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import NavBar from "./nav-bar"
import Login from "./login"
import User from "./user"
import Asset from "./asset"
import AssetCreateForm from "./asset/AssetCreateForm"
import Project from "./project"
import ProjectCreateForm from "./project/ProjectCreateForm"
import Catalog from "./catalog"
import Images from "./images"
import Colors from "./colors"
import Unsplash from "./images/Unsplash"
import styled from "styled-components"

export default function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([])
  const [assets, setAssets] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState("")

  const history = useHistory()

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => 
          setUser(user),
          setError(null),
          setStatus("resolved"))
      } else {
        r.json().then((err) =>
          setUser(null),
          setError(error.error),
          setStatus("rejected")
        )
      }
    })
  }, [])

  function handleDeleteAsset(id) {
    fetch(`/assets/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setAssets((assets) =>
          assets.filter((asset) => asset.id !== id)
        )
      } else {
        r.json().then((err) =>
          setAssets(null),
          setStatus("rejected")
        )
      }
      setError([])
      history.push("/catalog")
    });
  }

  function handleDeleteProject(id) {
    fetch(`/projects/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setProjects((projects) =>
          projects.filter((project) => project.id !== id)
        )
      } else {
        r.json().then((err) =>
          setAssets({ data: null, error: err.error, status: "rejected" })
        )
      }
      setError([])
      history.push("/catalog")
    })
  }
  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;
 
  return (
    <>
      <Main className={!status ? "loading" : ""}>
        {user ? (
          <>
            <NavBar user={user} setUser={setUser} />
            <Switch>
              <Route path="/assets/:id">
                <Asset handleDeleteAsset={handleDeleteAsset} user={user}/>
              </Route>
              <Route path="/assets">
                <Catalog/>
              </Route>
              <Route path="/catalog">
                <Catalog projects={projects} setProjects={setProjects} assets={assets} setAssets={setAssets}/>
              </Route>
              <Route path="/colors">
                <Colors />
              </Route>
              <Route path="/images">
                <Images />
              </Route>
              <Route path="/new-asset">
                <AssetCreateForm />
              </Route>
              <Route path="/new-project">
                <ProjectCreateForm />
              </Route>
              <Route path="/profile">
                <User user={user}/>
              </Route>
              <Route path="/projects/:id">
                <Project handleDeleteProject={handleDeleteProject} user={user} />
              </Route>
              <Route path="/projects">
                <Catalog />
              </Route>
              <Route path="/unsplash">
                <Unsplash />
              </Route>
              <Route exact path="/">
                <User />
              </Route>
            </Switch>
          </>
          
       ) : (
        
          <Login onLogin={setUser}/>
        
       )}
      </Main>
    </>
  )
}

const Main = styled.section `
.loading {
  opacity: 0.6;
  transition: opacity 0s;
  transition-delay: 0.4s;
  background-color: black;
}
`