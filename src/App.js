import "./App.css";
import { React, useState, useEffect } from "react";
import Task from "./Task";
import TaskMenu from "./TaskMenu";
import CreateTask from "./CreateTask";
import templates from "./components/_templates";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineQuestion} from 'react-icons/ai'
import {CgMathEqual} from 'react-icons/cg'
import {AiOutlineZoomIn} from 'react-icons/ai'
import Select from 'react-select';
//import prozent from './components/prozent';



const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  //subheading: `text-1xl font-bold text-center text-gray-800 p-2`,
  subheading: `prose prose-xl p-2`,
  subheadingbold: `prose prose-xl p-2 font-bold`,
  btnadd: `button text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnhelp: `button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-justify mr-2 mb-2`,
  btnresult: `button text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnexplainer: `button text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-lime-gray hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  //taskbuttons: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
  taskbuttons:      `my-3 h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`,
  taskbuttonactive: `my-3 h-12 text-black-900 ring-4 ring-blue-500 bg-red hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-500 font-small font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 focus:ring-1 focus:ring-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`
}

function App() {
  const [filterType, setFilterType] = useState('')
 
  const [currentTask, setCurrentTask] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const types = [
    {typ: "add",    btn: "-a + b",        txt: "Plus und Minus auf dem Zahlenstrahl"},
    {typ: "addsub", btn: "a - (-+b)",     txt: "Plus und Minus mit Klammern"},
    {typ: "lin1",   btn: "x + a = b",     txt: "Plus-Minus-Gleichungen"},
    {typ: "prop",   btn: "DREISATZ",      txt: "Proportionalität & Dreisatz", hasFilter: true},
    {typ: "prozent", btn: "PROZENT",      txt: "Anteile & Prozent", hasFilter: true},
    {typ: "lin3",   btn: "a * x = b",     txt: "Mal-Geteilt-Gleichungen"},
    {typ: "lin2",   btn: "ax + b = c",    txt: "Lineare Gleichungen"},
    {typ: "frac",   btn: "x / y",         txt: "Brüche kürzen"},
    {typ: "linfun", btn: "LINEAR y(x)",   txt: "Lineare Funktionen"}, 
    {typ: "quad",   btn: "QUAD y(x)",     txt: "Quadratische Funktionen", hasFilter: true},
    {typ: "potenzen", btn: "POTENZEN",    txt: "Potenzen", hasFilter: true},
    /*
    {typ: "proba1",  btn: "Zufall!",       txt: "Einfache Wahrscheinlichkeiten"},
    
    {typ: "inhalt", btn: "abc",           txt: "Strecke, Fläche, Volumen"},
    {typ: "brac",   btn: "( (...) )",   txt: "Klammerregeln"},
    {typ: "frac2",  btn: "1/2 + 1/3",   txt: "Brüche add/sub & mal/geteilt"},
    {typ: "terme3", btn: "Terme xyz^n", txt: "Komplexe Terme umstellen"},
    {typ: "zoom",   btn: "Zoom",        txt: "Strahlensatz, Ähnlichkeit, Zoom"},
    {typ: "drei",   btn: "ABCabc",      txt: "Dreiecke, Pythagoras"}, 
    {typ: "lin3",   btn: "I = II",    txt: "Lineare Gleichungssysteme"},

    {typ: "sincos", btn: "sin&cos",     txt: "Sinus, Cosinus, Tangens"},
    {typ: "sincos2", btn: "sin(a)/a",    txt: "Sinussatz, Cosinussatz"},
    {typ: "type1",  btn: "Test 1",      txt: "Test 1"},
    {typ: "type2",  btn: "Test 2",      txt: "Test 2"},
    {typ: "type3",  btn: "Test 3",      txt: "Test 3"},
    */
  ]

  
  const [selectedType, setSelectedType] = useState('potenzen');

  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const atype = searchParams.get('atype');
    if (atype) {
      const type = types.find(type => type.typ === atype);
      if (type) {
        setSelectedType(type.typ);
        //console.log("type " + type.typ)

      } else {
        setSelectedType('potenzen');
        //console.log("not type " + atype)
      }
    }
  }, [types]);


  // Update the URL parameter when selectedType changes
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('atype', selectedType);
    //const newURL = window.location.origin + window.location.pathname + '?' + searchParams.toString();
    //const newURL = window.location.origin + window.location.pathname
    const newURL = window.location.origin
    window.history.pushState({}, '', newURL);
  }, [selectedType]);



/////////////////////////











  let i = types.findIndex(item => item.typ === selectedType)
  let filter = types[i].hasFilter ? true : false
  //console.log(filter)

  const [selectedOption, setSelectedOption] = useState(0);
  const [submenu, setSubmenu] = useState("")

  const getRandomTask = () => {
    const filteredTasks = templates.filter((task) => task.type === selectedType);  // tasks filter
    if (filteredTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredTasks.length);
      const task = filteredTasks[randomIndex];
      if (filter && submenu) task.subfilter = selectedOption.val
      const processedTask = CreateTask(task);
      setSubmenu(processedTask.menu);
      setCurrentTask(processedTask);
      setShowHelp(false);
      setShowResult(false);
      setShowExplainer(false);
      //setDisabled(false);
    }
};
//console.log(submenu)

// Damit GetRandomTask auch bei Typ-Wechsel

const onClear = () => {
  setSelectedOption(0);
};

useEffect(() => {
  //setSelectedOption({ val: 0, label: 'alle Einzelthemen ...' }); // bringt es nicht
  getRandomTask();
  onClear();
}, [selectedType]) // eslint-disable-line react-hooks/exhaustive-deps
useEffect(() => {
  getRandomTask();
}, [selectedOption]) // eslint-disable-line react-hooks/exhaustive-deps

const toggleShowHelp = () => {
setShowHelp(!showHelp);
setShowResult(false);
setShowExplainer(false);
};

const toggleShowResult = () => {
setShowResult(!showResult);
setShowHelp(false);
setShowExplainer(false);
};

const toggleShowExplainer = () => {
setShowExplainer(!showExplainer);
setShowHelp(false);
setShowResult(false);
};


const handleTypeSelection = (type) => {
  //setSelectedOption({ val: 0, label: 'alle Einzelthemen ...' }); // zu spät! Erst beim nächsten Klick!   
  setSelectedType(type);
};


let options
if (filter && submenu) {
  options = [
    { val: 0, label: 'alle Einzelthemen' },
          ...submenu.map(item => ({ val: item.nr, label: item.title })),
  ];
}


return (


<div className={style.bg}>
    <div className={style.container}>
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                  <div>
                      <a href="https://schlau.app" className="my-1 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
                        <img className="mr-2 h-12 w-12 rounded-md" src="https://mathbydoing.app/apple-touch-icon.png" alt="schlau.app Logo" loading="lazy" />
                        <span className={style.heading}>schlau.app</span>
                      </a>
                  </div>
              </div>
        </nav>

        <h4 id="typedesc" className={style.subheadingbold}>{selectedType ? types.find((type) => type.typ === selectedType).txt : 'Practice Math and Boost Your Brainpower!'}</h4>
            
        <main>
            <div className="buttons-container">
              <button title="New task" type="button" className={style.btnadd}
                onClick={getRandomTask}><AiOutlinePlus size={20} /></button>
              <button title="Help" type="button" className={style.btnhelp}
                onClick={toggleShowHelp}><AiOutlineQuestion size={20} /></button>
              <button title="Result" type="button" className={style.btnresult}
                onClick={toggleShowResult}><CgMathEqual size={20} /></button>
              <button title="Explainer" type="button" className={style.btnexplainer}
                onClick={toggleShowExplainer}><AiOutlineZoomIn size={20} /></button>
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
                //filterx={3}
              />
            )}

              {/*filter && (
              <TaskMenu
                key={currentTask.name}
                task={currentTask}
                showHelp={showHelp}
                toggleShowHelp={toggleShowHelp}
                showResult={showResult}
                toggleShowResult={toggleShowResult}
                showExplainer={showExplainer}
                toggleShowExplainer={toggleShowExplainer}
              />
              )*/}

              {filter && submenu && (
                  <div className="Task">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </div>
              )}
            

            <div className="types">
                {types.map((type) => (
                  <button  type="button"
                    key={type.typ}
                    onClick={() => handleTypeSelection(type.typ)}
                    //disabled={selectedType === type.typ}
                    //style={{ backgroundColor: selectedType === type.typ ? '#00b7eb' : '' }}
                    className={selectedType === type.typ ? style.taskbuttonactive : style.taskbuttons}
                  >
                    {type.btn}
                  </button>
                ))}
            </div>

        </main>

        <footer className="mt-12  text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-0 text-center text-neutral-700 dark:text-neutral-200">
              <a target="_blank" href="/mathe-app-docs/index.html">Docs</a>  |
              {/*Leitfaden / Prüfungsvorbereitung erstmal weg */}
              {/*<a target="_blank" href="/mathe-app-docs/pruefungsvorbereitung-mathematik.html">Leitfaden</a>  | */}
              &nbsp;<a href="https://www.youtube.com/@mathbydoing" target="_blank" rel="noreferrer">YouTube</a> | <a href="https://www.linkedin.com/in/internetpartnership/" target="_blank" rel="noreferrer">Kontakt</a>
            </div>
        </footer>
    </div>
</div>


);

}

export default App;



