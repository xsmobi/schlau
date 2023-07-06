import {React} from "react";
//import prozentmenu from "./components/prozentmenu"
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
    const { text } = task;
    return (
    <div className="Task">
        <h3>Submenü (folgt): {/*menu*/}</h3>
    </div>
    );
}
export default TaskMenu;