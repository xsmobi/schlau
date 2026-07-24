import "./App.css";
import { React, useState, useEffect } from "react";
import Task from "./Task";
//import TaskMenu from "./TaskMenu";
import CreateTask from "./CreateTask";
import taskTypes from "./taskTypes";
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineQuestion} from 'react-icons/ai'
import {CgMathEqual} from 'react-icons/cg'
import {AiOutlineZoomIn} from 'react-icons/ai'
import Select from 'react-select'
//import SEO from './SEO'
//import prozent from './components/prozent';



const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2 notranslate`,
  //subheading: `text-1xl font-bold text-center text-gray-800 p-2`,
  subheading: `prose prose-xl p-2`,
  subheadingbold: `prose prose-xl p-2 font-bold`,
  btnadd: `button text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnhelp: `button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-justify mr-2 mb-2`,
  btnresult: `button text-white bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  btnexplainer: `button text-gray-900 bg-gradient-to-r from-gray-200 via-gray-400 to-lime-gray hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
  //taskbuttons: `text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`
  taskbuttons:      `my-3 h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`,
  taskbuttonactive: `my-3 h-12 text-black-900 ring-4 ring-blue-500 bg-red hover:bg-red focus:ring-4 focus:outline-none focus:ring-blue-500 font-small font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-0 focus:ring-1 focus:ring-black dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-cyan-300 dark:border-gray-700`,
  sel: `p-2 text-sm`
}

function App() {
  //const [filterType, setFilterType] = useState('')
 
  const [currentTask, setCurrentTask] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const [selectedType, setSelectedType] = useState('lin1');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const atype = searchParams.get('atype');
    if (atype) {
      const type = taskTypes.find(type => type.type === atype);
      if (type) {
        setSelectedType(type.type);
      } else {
        setSelectedType('potenzen');
      }
    }
  }, []);
  // Update the URL parameter when selectedType changes
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('atype', selectedType);
    const newURL = window.location.origin
    window.history.pushState({}, '', newURL);
  }, [selectedType]);

  let i = taskTypes.findIndex(item => item.type === selectedType)
  let filter = taskTypes[i].hasFilter ? true : false

  const [selectedOption, setSelectedOption] = useState(0);
  const [submenu, setSubmenu] = useState("")

  const getRandomTask = () => {
    const task = { type: selectedType };
    if (filter && submenu) task.subfilter = selectedOption.val
    //console.log(selectedOption.val)
    const processedTask = CreateTask(task);
    setSubmenu(processedTask.menu);
    setCurrentTask(processedTask);
    setShowHelp(false);
    setShowResult(false);
    setShowExplainer(false);
    handleStop1();
};
//console.log(submenu)

// Damit GetRandomTask auch bei Typ-Wechsel
const onClear = () => {
  setSelectedOption(0);  // funktioniert, wenn selectedType ohne options
};

const handleStop1 = () => {
  const synth = window.speechSynthesis;

  synth.cancel();

};

useEffect(() => {
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
            <div className="flex w-full flex-wrap items-center justify-between px-3 bg-red-white">
                  <div>
                      <a href="https://schlau.app" className="my-1 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0">
                        <img className="mr-2 h-12 w-12 rounded-md" src="https://mathbydoing.app/apple-touch-icon.png" alt="schlau.app Logo" loading="lazy" />
                        <span className={style.heading} translate="no">schlau.app</span>
                      </a>
                  </div>
              </div>
        </nav>

        <h4 id="typedesc" className={style.subheadingbold}>{selectedType ? taskTypes.find((type) => type.type === selectedType).txt : 'Practice Math and Boost Your Brainpower!'}</h4>
            
        <main>
            <div className="buttons-container">
              <button title="New task - Key: alt + '+'" type="button" accessKey="+" className={style.btnadd}
                onClick={getRandomTask}><AiOutlinePlus size={20} /></button>
              <button title="Help - Key: alt + '?'" type="button" accessKey="?" className={style.btnhelp}
                onClick={toggleShowHelp}><AiOutlineQuestion size={20} /></button>
              <button title="Result - Key: alt + '='" type="button" accessKey="=" className={style.btnresult}
                onClick={toggleShowResult}><CgMathEqual size={20} /></button>
              <button title="Explainer - Key: alt + '0'" type="button" accessKey="0" className={style.btnexplainer}
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

              {filter && submenu && (
                  <div className="mt-4">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      className={style.sel}
                    />
                  </div>
              )}
            

            <div className="types">
                {taskTypes.map((type) => (
                  <button  type="button"
                    key={type.type}
                    accessKey = {type.kbd}
                    onClick={() => handleTypeSelection(type.type)}
                    //disabled={selectedType === type.type}
                    //style={{ backgroundColor: selectedType === type.type ? '#00b7eb' : '' }}
                    className={selectedType === type.type ? style.taskbuttonactive : style.taskbuttons}
                    title={type.txt + ' Key: alt + '+ type.kbd}
                  >
                    {type.btn}
                  </button>
                ))}
            </div>

        </main>

        <footer className="mt-12  text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-0 text-center text-neutral-700 dark:text-neutral-200">
              <a target="_blank" href="/mathe-app-docs/index.html">Schüler</a>  |
              <a target="_blank" href="/mathe-app-docs/mathetraining-mit-lehrwert-per-mathe-app.html"> Lehrer</a>  |
              <a target="_blank" href="/mathe-app-docs/mathespiel-matheprofi-im-klassenraum.html"> Mathespiel</a>  |              
              {/*Leitfaden / Prüfungsvorbereitung erstmal weg */}
              {/*<a target="_blank" href="/mathe-app-docs/pruefungsvorbereitung-mathematik.html">Leitfaden</a>  | */}
              &nbsp;<a href="https://www.youtube.com/@mathbydoing" target="_blank" rel="noreferrer">YouTube</a> | <a href="https://goo.gl/maps/Nt5q2Ag7vqkJsEgV7" target="_blank" rel="noreferrer">Kontakt</a>
            </div>
        </footer>
    </div>

</div>



);

}

export default App;



