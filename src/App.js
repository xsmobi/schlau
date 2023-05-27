import { React, useState, useEffect } from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
import templates from "./components/_templates";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import {AiOutlineExclamationCircle} from 'react-icons/ai'
import {AiOutlineEllipsis} from 'react-icons/ai'
// import {TbMathXPlusY} from 'react-icons/tb'
// import {TbMath1Divide3} from 'react-icons/tb'
//import {TbBracketsContain} from 'react-icons/tb'
// import {TbMathFunction} from 'react-icons/tb'

/*
4 Buttons oben

plus minus Zahlenstrahl
Bruchrechnung
Klammer und Terme umstellen
lineare Gleichungen, nach x auflösen

4 Buttons mitte
Flächen und  körper
Strahlensatz
Pythagoras
Sin cos tan

4 Buttons unten

lineare Funktionen
lineare Gleichungssysteme
quadratische Funktionen
Infinitesimalrechnung
*/

const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  subheading: `text-1xl font-bold text-center text-gray-800 p-2`,
  //taskbuttons: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
  taskbuttons: `my-3 h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
}

function App() {
  const [currentTask, setCurrentTask] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  //const [disabled, setDisabled] = useState(true);
  //const types = ['add', 'addsub', 'lin1', 'type1', 'type2', 'type3'];
  
  const types = [
    {typ: "add",    btn: "+ / -",       txt: "Plus und Minus auf dem Zahlenstrahl"},
    {typ: "addsub", btn: "-(-+)",       txt:"Plus und Minus mit Klammern"},
    {typ: "inhalt", btn: "a * b * c",   txt:"Strecke, Fläche, Volumen"},
    {typ: "brac",   btn: "( () )",      txt:"Klammerregeln"},
    {typ: "frac",   btn: "2 / 3",       txt: "Bruchrechnung"},
    {typ: "terme1", btn: "x + a",       txt:"Plus-Minus-Terme umstellen"},
    {typ: "terme2", btn: "Terme */:",   txt: "Mal-Geteilt-Terme umstellen"},
    {typ: "prop",   btn: "Linear 1",    txt: "Proportionalität, Anteil, Prozent"},
    {typ: "zoom",   btn: "Zoom",        txt: "Strahlensatz, Ähnlichkeit, Zoom"},
    {typ: "drei",   btn: "ABCabc",      txt: "Dreiecke, Pythagoras"},
    {typ: "lin1",   btn: "Linear 1",    txt: "Lineare Funktionen"},
    {typ: "lin2",   btn: "Linear 2",    txt: "Lineare Gleichungssysteme"},
    {typ: "quad",   btn: "( )^2",       txt: "Quadratische Funktionen"},
    {typ: "sincos", btn: "sin&cos",     txt: "Quadratische Funktionen"},
    {typ: "type1",  btn: "Test 1",      txt: "Test 1"},
    {typ: "type2",  btn: "Test 2",      txt: "Test 2"},
    {typ: "type3",  btn: "Test 3",      txt: "Test 3"},
  ]
  
  const [selectedType, setSelectedType] = useState('addsub');

  useEffect(() => {
    getRandomTask();
  }, [selectedType]);

  const getRandomTask = () => {
    const filteredTasks = templates.filter((task) => task.type === selectedType);
    if (filteredTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredTasks.length);
      const task = filteredTasks[randomIndex];
      const processedTask = CreateTask(task);
      // console.log(processedTask)
      setCurrentTask(processedTask);
      setShowHelp(false);
      setShowResult(false);
      setShowExplainer(false);
      //setDisabled(false);
    }
};

const toggleShowHelp = () => {
setShowHelp(!showHelp);
};

const toggleShowResult = () => {
setShowResult(!showResult);
};

const toggleShowExplainer = () => {
setShowExplainer(!showExplainer);
setShowHelp(false);
setShowResult(false);
};

const handleTypeSelection = (type) => {
setSelectedType(type);
};

return (
<div className={style.bg}>
    <div className={style.container}>
        <h3 className={style.heading}>schlau.app</h3>
            <img className="h-12 w-12" src="https://mathbydoing.app/apple-touch-icon.png" alt="logo" />
            <h4 id="typedesc" className={style.subheading}>{selectedType ? types.find((type) => type.typ === selectedType).txt : 'Practice Math and Boost Your Brainpower!'}</h4>
            

        <main>
            <div className="buttons-container">
              <button  type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={getRandomTask}><AiOutlinePlus size={30} /></button>
              <button  type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={toggleShowHelp}><AiOutlineQuestionCircle size={30} /></button>
              <button  type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={toggleShowResult}><AiOutlineExclamationCircle size={30} /></button>
              <button  type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={toggleShowExplainer}><AiOutlineEllipsis size={30} /></button>
            </div>

            {currentTask && (
              <Task
                key={currentTask.name}
                task={currentTask}
                showHelp={showHelp}
                toggleShowHelp={toggleShowHelp}
                showResult={showResult}
                toggleShowResult={toggleShowResult}
                showExplainer={showExplainer}
                toggleShowExplainer={toggleShowExplainer}
              />
            )}


            <div className="types">
                {types.map((type) => (
                  <button  type="button" className={style.taskbuttons}
                    key={type.typ}
                    onClick={() => handleTypeSelection(type.typ)}
                    //disabled={selectedType === type.typ}
                    style={{ backgroundColor: selectedType === type ? 'lightgreen' : '' }}
                  >
                    {type.btn}
                  </button>
                ))}
            </div>
        </main>

        <footer class="mt-12 bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
            <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
              © 2023 Copyright:
              <a class="text-neutral-800 dark:text-neutral-400" href="https:mathbydoing.app">Practice math, it powers your success!</a> 
            </div>
        </footer>
    </div>
</div>
);
}

export default App;