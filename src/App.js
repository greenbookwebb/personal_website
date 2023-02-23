import './App.css';
import React from 'react';
import { ReactTerminal } from "react-terminal";
import axios from 'axios';

function App() {

  const [theme, setTheme] = React.useState("dark");
  const [controlBar, setControlBar] = React.useState(true);
  const [controlButtons, setControlButtons] = React.useState(true);
  const [prompt, setPrompt] = React.useState(">>>");
  
  const commands = {
    help: (
      <span>
        <h2>Skills</h2><strong>software_languages</strong> - This pront displays software development langages, and skill level.  <br />
        <br />
        
        <h2>Site Changes</h2>
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


    software_languages: (
      <span>
        <strong>Javascript</strong> <br />
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
          <img src={data.avatar_url} alt="User Avatar" style={{ borderRadius: '50%' }} />
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

    Resume: () => {
      window.open(process.env.PUBLIC_URL + "/Lachlan_Webb_CV.pdf", "_blank");
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
      <h3>
      Type "help" to see the list of available commands. <br />
    </h3>
    
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
