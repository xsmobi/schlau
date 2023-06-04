import { MathJax, MathJaxContext } from "better-react-mathjax";
const style={
    taskheader:`text-center prose prose-2xl`,
    tasktext: `prose prose-sm`,
    subheader: `text-center prose prose-lg`
}

function Task({ task, showHelp, showResult, showExplainer }) {
    const { text, help, answer, explainer, headerclass } = task;
    const headerClassName = headerclass ? style[headerclass] : style.taskheader;
    //console.log(headerclass)
    //<h3 className={style.taskheader}>{text}</h3>
    // {showResult && <h3 className={style.taskheader}>{answer}</h3>}
    return (
    <MathJaxContext><MathJax>
    <div className="Task">
        <h3 className={headerClassName || style.taskheader}>{text}</h3>
        {showHelp && <div className={style.tasktext} dangerouslySetInnerHTML={{ __html: help }} />}
        {showResult && <h3 className={headerClassName || style.taskheader}>{answer}</h3>}
        {showExplainer && <div  className={style.tasktext} dangerouslySetInnerHTML={{ __html: explainer }} />}
    </div>
    </MathJax></MathJaxContext>
    );
}
export default Task;