import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./App.css";

function GenerateList() {
  // Make a list of link and text pairs
  const links = [
    ["https://www.youtube.com/watch?v=QH2-TGUlwu4", "How to use the website"],
    [
      "https://docs.google.com/document/d/1BIXo0dsc0P8TBjwk_rVobkf-AF4_cql7_jvun2gt018/edit",
      "General Resources",
    ],
    [
      "https://docs.google.com/document/d/1BIXo0dsc0P8TBjwk_rVobkf-AF4_cql7_jvun2gt018/edit",
      "Programming Resources",
    ],
    ["https://www.robotevents.com/?authuser=0", "Competitions And Rankings"],
    ["https://wiki.purduesigbots.com/?authuser=0", "Purdue Sigbots"],
    [
      "https://roboticseducation.org/documents/2023/06/engineering-notebook-rubric.pdf/?authuser=0",
      "Notebook Rubric",
    ],
    [
      "https://docs.google.com/presentation/d/1PsUfQGuLfc1xyzO75dDf8jeQ4IdF7-conRXdcxp5IyE/edit?pli=1#slide=id.g13b570f945c_0_1258",
      "Notebook Slideshow",
    ],
    [
      "https://content.vexrobotics.com/docs/23-24/vrc-overunder/VRC-23-24-GameManual-0.1-Release.pdf ",
      "Game Manual",
    ],
    [
      "https://pros.cs.purdue.edu/v5/index.html?authuser=0",
      "PROS Documentation",
    ],
    [
      "https://docs.google.com/document/d/1hC3grgixl56cvOhXuUkdStI45lio4NfJ4vEaEjL0WG0/edit?usp=sharing",
      "Guide to installing PROS",
    ],
    [
      "https://docs.google.com/document/d/1eZzUTf-E1eWivG2LW2JYiycsWCCf3LlKMQpAoosaWqY/edit?usp=sharing",
      "Guide to Version Control with Git",
    ],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ];

  // Make a list of list items
  let listItems = [];
  for (let i = 0; i < links.length; i++) {
    if (links[i][0] === "") {
      continue;
    }
    listItems.push(
      <li key={i}>
        <a href={links[i][0]} target="_blank" rel="noopener noreferrer">
          {links[i][1]}
        </a>
      </li>
    );
  }

  // Combine the list items into one string
  return listItems;
}

function Resources() {
  console.log("Resources");
  return (
    <>
      <h1
        style={{
          color: "#fcba03",
          textAlign: "center",
          textShadow: "0 0 4px #ffc400",
        }}
      >
        Resources
      </h1>
      <div className="resources" style={{ textAlign: "left" }}>
        <ul style={{ listStyleType: "disc" }}>
          <GenerateList />
        </ul>
      </div>
    </>
  );
}

export default Resources;
