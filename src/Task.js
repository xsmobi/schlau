import {React} from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
const style={
    taskheader:`text-center prose prose-2xl`,
    tasktext: `prose prose-sm`,
    subheader: `prose prose-lg font-semibold`
}

function Task({ task, showHelp, showResult, showExplainer }) {
    const { text, help, answer, explainer, headerclass } = task;
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
    return (
    <MathJaxContext>
    <div className="Task">
        <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic>{text}</MathJax></h3>
        {showHelp && <MathJax inline dynamic><div className={style.tasktext} dangerouslySetInnerHTML={{ __html: help }} /></MathJax>}
        {showResult && <h3 className={headerClassName || style.taskheader}><MathJax inline dynamic>{answer}</MathJax></h3>}
        {showExplainer && <div  className={style.tasktext} dangerouslySetInnerHTML={{ __html: explainer }} />}
    </div>
    </MathJaxContext>
    );
}
export default Task;

