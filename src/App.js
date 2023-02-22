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

    check_weather: async (city) => {
      try {
        
      const data = await await axios.get(`https://wttr.in/${city}?ATm`);
      console.log("data", data);
      console.log("data.data", data.data);
      
      return <div className="weather" dangerouslySetInnerHTML={{ __html: data.data.replace(/\n/g, "<br>") }} />
      } catch (error) {
        console.log("error", error);
      }
      
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
      Type "help" for all available commands. <br />
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
