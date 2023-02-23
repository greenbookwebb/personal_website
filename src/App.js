import './App.css';
import React from 'react';
import { ReactTerminal } from "react-terminal";
import axios from 'axios';

function App() {

  const [theme, setTheme] = React.useState("dark");
  const [controlBar, setControlBar] = React.useState(true);
  const [controlButtons, setControlButtons] = React.useState(true);
  const [prompt, setPrompt] = React.useState("visitor@lachlan_webb: $ ~ ");


  function openPdf() {
    window.open(process.env.PUBLIC_URL + "/Lachlan_Webb_CV.pdf", "_blank");
  };
  function openNature() {
    window.open(process.env.PUBLIC_URL + "/Nature_Article.pdf", "_blank");
  };
  function openPerpSwaps() {
    window.open(process.env.PUBLIC_URL + "/Tracer_Perpetual_Swaps_Whitepaper.pdf", "_blank");
  };
  function openPerpPools() {
    window.open(process.env.PUBLIC_URL + "/Tracer_Perpetual_Pools_Litepaper.pdf", "_blank");
  };
  function openStablecoin() {
    window.open(process.env.PUBLIC_URL + "/Tracer_Stablecoin.pdf", "_blank");
  };
  
  const commands = {
    help: (
      <span>
        <h2>Skills & Experience commands</h2><strong>software_languages</strong> - This pront displays software development langages, and skill level.  <br />
        <strong>profile</strong> - Display profile for Lachlan Webb.  <br />
        <strong>getGithubProfile</strong> - Gets Github profile.  <br />
        <strong>getGithubRepos</strong> - Gets Github repos.  <br />
        <strong>CV</strong> - Gets CV.  <br />
        <strong>openTwitter</strong> - Opens Lachlan Webb's twitter profile. <br />
        <strong>publications</strong> - Shows publications/whitepapers I have co-written. <br />

        
        <br />
        
        <h2>UI commands</h2>
        <strong>clear</strong> - clears the console. <br />
        <strong>change_prompt &lt;PROMPT&gt;</strong> - Change the prompt of the
        terminal. <br />
        <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
        terminal. Allowed themes - light, dark, material-light, material-dark,
        material-ocean, matrix and dracula. <br />
        <strong>toggle_control_bar</strong> - Hides / Display the top control
        bar. <br />
        <strong>toggle_control_buttons</strong> - Hides / Display the top
        buttons on control bar. <br />
        <strong>evaluate_math_expression &lt;EXPR&gt;</strong> - Evaluates a
        mathematical expression (eg, <strong>4*4</strong>) by hitting a public
        API, api.mathjs.org. <br />
        
      </span>
    ),

    profile: (

      <div>
        <h2>ABOUT</h2>
        <p><strong>Name:</strong> Lachlan Webb</p>
        <p>I was the Financial Engineering Lead at Mycelium, which is a service provider to the Tracer DAO. I have a
deep knowledge of DeFi derivatives, AMMs, market making, and arbitrage strategies. I have co-designed both
a Perpetual Swaps mechanism (Perpetual Future), and a novel mechanism named Perpetual Pools (Leveraged
Token). </p><p>
In November 2022, I made the decision to leave Tracer DAO to pursue my passion for software engineering.
Despite a successful tenure as a DeFi project designer, I felt limited in my growth potential and sought to expand
my skillset as a full-stack developer. Since then, I have dedicated myself to continuously learning through various
bootcamps in Javascript, Solidity, and React. Although my software engineering experience may be limited, I
am learning at an accelerated pace and bring with me a deep understanding of DeFi projects and mechanisms
from my previous role. I am confident in my ability to apply my knowledge and skills to create innovative and
impactful solutions in the software engineering industry.</p>
        
        <button onClick={openPdf}>CV</button>
        <p><strong>Email:</strong></p> <p> <a href="mailto:lachlanwebb123@gmail.com" target="blank">lachlanwebb123@gmail.com</a></p>
        <p><strong>Github:</strong></p> <p> <a href="https://github.com/greenbookwebb">https://github.com/greenbookwebb</a></p>
        <p><strong>LinkedIn:</strong></p> <p> <a href="https://au.linkedin.com/in/lachlan-webb-141048118">https://au.linkedin.com/in/lachlan-webb-141048118</a></p>

        

      </div>
    ),

    software_languages: (
      <span>
        <h3><strong>Python</strong></h3>
        <h3><strong>Javascript (React)</strong></h3>
        <h3><strong>HTML</strong></h3>
        <h3><strong>CSS</strong></h3>
        <h3><strong>Solidity</strong></h3>
        
      </span>
    ),

    change_prompt: (prompt) => {
      setPrompt(prompt);
    },

    change_theme: (theme) => {
      const validThemes = [
        "light",
        "dark",
        "material-light",
        "material-dark",
        "material-ocean",
        "matrix",
        "dracula",
      ];
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
      }
      setTheme(theme);
    },

    toggle_control_bar: () => {
      setControlBar(!controlBar);
    },

    toggle_control_buttons: () => {
      setControlButtons(!controlButtons);
    },

    getGithubProfile: async () => {   
      const {data} =  await axios.get(`https://api.github.com/users/greenbookwebb`);
      console.log("data",data);
      
      return <div>
      {data && (
        <div>
          <img src={data.avatar_url} alt="User Avatar" style={{ borderRadius: '50%', width: '250px', height: 'auto' }} />
          <h2>Profile: <a href={data.html_url}>{data.login}</a></h2>
          <p>{data.bio}</p>
          <p>Created at: {data.created_at}</p>
          <p>Public Repos: {data.public_repos}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
        </div>
      )}
    </div>
    },


    getGithubRepos: async () => {   
      const {data} =  await axios.get(`https://api.github.com/users/greenbookwebb/repos`);
      console.log("data",data);
      
      return (
        <div>
          <ul>
            {data.map(repo => (
              <>
              <h2 key={repo.id}>{repo.name}</h2>
              <p key={repo.id}>Description: {repo.description}</p>
              <p key={repo.id}>Deployed Page: <a href={repo.homepage}>{repo.homepage}</a></p>
              <p key={repo.id}>Repo Github Page: <a href={repo.html_url}>{repo.html_url}</a></p>
              </>
            ))}
          </ul>
        </div>)
    },

    CV: () => {
      openPdf();
    },

    publications: () => (
      <div>
      <h2>UQ Publications</h2>
      <button onClick={openNature}>Climate Risk Publication (Published in Nature)</button>

      <h2>Tracer Publications</h2>
      <button onClick={openPerpSwaps}>Tracer Perpetual Swaps Whitepaper</button>
      <button onClick={openPerpPools}>Tracer Perpetual Pools Whitepaper</button>
      <button onClick={openStablecoin}>Tracer Purchasing Power Stablecoin</button>
      </div>


),

    openTwitter: () => {
      window.open("https://twitter.com/defihotguy", "_blank");
    },

    evaluate_math_expression: async (expr) => {
      const response = await fetch(
        `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
      );
      return await response.text();
    },
  };
  

  const welcomeMessage = (
    <>
    
    <h1 style={{ fontWeight: "bold" }}>
      Welcome to Lachlan Webb's personal website. <br /></h1>
      <h4>
      Type "profile" to display profile of Lachlan Webb. <br />
      Type "CV" to see Lachlan Webb's CV.<br />
      Type "help" to see the list of available commands. <br />
    </h4>

    
    </>
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (<div className="App-header"><ReactTerminal
  prompt={prompt}
  theme={theme}
  showControlBar={controlBar}
  showControlButtons={controlButtons}
  welcomeMessage={welcomeMessage}
  commands={commands}
  defaultHandler={(command, commandArguments) => {
    return `${command} passed on to default handler with arguments ${commandArguments}`;
  }}
/>
  </div>);
}



export default App;
