import React, { useEffect, useRef, useState } from "react";
import BreakingBad from "../src/BreakingBad";
import "./App.css";

function BreakingBads() {
  const videoRef = useRef();
  const [bbEpisodes, setBbEpisodes] = React.useState([]);
  const [bbCharacters, setBbCharacters] = React.useState([]);
  const [highlight, setHighlight] = React.useState();

  React.useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
      .then((response) => response.ok && response.json())
      .then((characters) => {
        setBbCharacters(
          characters.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
      .then((response) => response.ok && response.json())
      .then((episodes) => {
        console.warn(episodes);
        setBbEpisodes(episodes);
      })
      .catch(console.error);
  }, []);

  //   React.useEffect(() => {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: false })
  //       .then((stream) => {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play();
  //       });
  //   }, []);
  return (
    <>
      <h1>Breaking Bad TimeLine</h1>
      <BreakingBad highlight={highlight} data={bbEpisodes}></BreakingBad>
      <h2>Select your Character</h2>
      <select value={highlight} onChange={(e) => setHighlight(e.target.value)}>
        <option>Select Character</option>
        {bbCharacters.map((character) => (
          <option key={character.name}>{character.name}</option>
        ))}
      </select>
      {/* <video
        ref={videoRef}
        style={{ transform: "scale(-1,1)" }}
        width="300"
        height="150"
      ></video> */}
    </>
  );
}

export default BreakingBads;
