import {React, useState} from "react";
//import { useContext } from 'react';
//import { FilterContext } from './FilterContext';
//import aufgaben from "./components/prozent"
import Select from 'react-select';
import prozent from './components/prozent';

const style={
    taskheader:`text-center prose prose-lg`,
    tasktext: `prose prose-sm`,
    helptext: `prose prose-lg border-solid border-2 border-red-600 px-2 rounded-md`,
    resulttext: `prose prose-lg`,
    //explainertext: `prose prose-lg border-dashed border-4 border-gray-400 px-2`,
    explainertext: `prose prose-lg border-solid border-2 border-gray-400 px-2 my-2 rounded-md`,
    subheader: `prose prose-lg`
}

function TaskMenu({ task }) {
    const [selectedOption, setSelectedOption] = useState(null);
    //const { filter, setFilter } = useContext(FilterContext);
    const { text } = task;

    let aufgabe=prozent();
    // Menu!
    let menu = aufgabe[5]
    //console.log(menu)

    //let aufgabeDaten = []
    //aufgabedaten = prozent();

    const options = [
        { value: 'alle', label: 'Dieses Menu ist noch nicht aktiv' },
        ...menu.map(item => ({ value: item.nr, label: item.title })),
      ];
//if(selectedOption) console.log(selectedOption.value)


     //console.log(options);




    return (
    <div className="Task">
                        <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
    </div>
    );
}
export default TaskMenu;
