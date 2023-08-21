import {React} from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
//import prozentmenu from "./components/prozentmenu"
import TextToSpeech from './TextToSpeech';
const style={
    taskheader:`text-center prose prose-lg`,
    tasktext: `prose prose-sm`,
    helptext: `prose prose-lg border-solid border-2 border-red-600 px-2 py-2 mb-2 rounded-md`,
    resulttext: `prose prose-lg`,
    explainertext: `prose prose-lg border-solid border-2 border-gray-400 px-2 my-2 rounded-md`,
    subheader: `prose prose-lg`,
    subheader2: `prose prose-2xl`,
    subheader3: `prose prose-2xl font-black`
}

function Task({ task, showHelp, showResult, showExplainer }) {
    const { text, help, answer, explainer, headerclass, menu, speak, speakhelp, speakexplainer } = task;
    //console.log(task)
    //console.log("task", text)
    //console.log(headerclass, menu, speak)
    const headerClassName = headerclass ? style[headerclass] : style.taskheader;
  
    let menu_display = menu === "undefined" ? "" : menu
    menu_display = "" // klappte, aber jetzt neu über component TaskMenu
    
    return (
    <MathJaxContext>
    <div className="Task">

        <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic><span  dangerouslySetInnerHTML={{ __html: text }} /></MathJax></h3>
        {showHelp && <MathJax inline dynamic><div className={style.helptext} dangerouslySetInnerHTML={{ __html: help }} /></MathJax>}
        {showResult && <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic><span  dangerouslySetInnerHTML={{ __html: answer }} /></MathJax></h3>}
        {showExplainer && <MathJax inline dynamic><div  className={style.explainertext} dangerouslySetInnerHTML={{ __html: explainer }} /></MathJax>}

        {/*  */}
        {showResult && speak && (<TextToSpeech text={speak} />)}
        {showHelp && speakhelp && (<TextToSpeech text={speakhelp} />)}
        {showExplainer && speakexplainer && (<TextToSpeech text={speakexplainer} />)}
    </div>
    </MathJaxContext>
            
    );
}
export default Task;

