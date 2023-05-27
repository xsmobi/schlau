const style={
    taskheader:`text-1xl font-bold text-center text-gray-800 p-2`,
    tasktext:`text-neutral-800 dark:text-neutral-400`
}

function Task({ task, showHelp, showResult, showExplainer, toggleShowHelp }) {
    const { text, help, answer, explainer } = task;
    return (
    <div className="Task">
        <h3 className={style.taskheader}>{text}</h3>
        {showHelp && <div className={style.taskheader} dangerouslySetInnerHTML={{ __html: help }} />}
        {showResult && <h3 className={style.taskheader}>{answer}</h3>}
        {showExplainer && <div  className={style.tasktext} dangerouslySetInnerHTML={{ __html: explainer }} />}
    </div>
    );
    }
    
    export default Task;