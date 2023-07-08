import {React} from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import prozentmenu from "./components/prozentmenu"
const style={
    taskheader:`text-center prose prose-lg`,
    tasktext: `prose prose-sm`,
    helptext: `prose prose-lg border-solid border-2 border-red-600 px-2 rounded-md`,
    resulttext: `prose prose-lg`,
    explainertext: `prose prose-lg border-solid border-2 border-gray-400 px-2 my-2 rounded-md`,
    subheader: `prose prose-lg`
}

function Task({ task, showHelp, showResult, showExplainer }) {
    const { text, help, answer, explainer, headerclass, menu } = task;
    //console.log(task)
    //console.log("task", text)
    const headerClassName = headerclass ? style[headerclass] : style.taskheader;
        /*
    const config = {
      loader: { load: ["input/asciimath"] },
      "fast-preview": {disabled: true}
    };
    <MathJaxContext
      version={2}
      config={config}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}>
    */
  
    let menu_display = menu === "undefined" ? "" : menu
    menu_display = "" // klappte, aber jetzt neu über component TaskMenu
    return (
    <MathJaxContext>
    <div className="Task">

        {menu === undefined ? "" : menu_display}
        {menu_display === "xxxprozentmenu" ?
        prozentmenu()
      
        : ""
        }
        <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic>{text}</MathJax></h3>
        {showHelp && <MathJax inline dynamic><div className={style.helptext} dangerouslySetInnerHTML={{ __html: help }} /></MathJax>}
        {showResult && <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic>{answer}</MathJax></h3>}
        {showExplainer && <MathJax inline dynamic><div  className={style.explainertext} dangerouslySetInnerHTML={{ __html: explainer }} /></MathJax>}
    </div>
    </MathJaxContext>
    );
}
export default Task;

