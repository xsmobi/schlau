//import {useContext} from 'react';
//import {FilterContext} from './App'
import add from './components/add';
import addsub from './components/addsub';
import frac from './components/frac';
import lin1 from './components/lin1';
import lin2 from './components/lin2';
import lin3 from './components/lin3';
import prop from './components/prop';
import prozent from './components/prozent';
import linfun from './components/linfun';
import quad from './components/quad';
import proba1 from './components/proba1';


function CreateTask(task) {

    const { type, val1, val2, subfilter } = task;
   
    let aufgabeDaten = []
    let filter = subfilter ? subfilter-1 : " "
    //console.log("endfilter", filter)
   
    switch(type){
        case "add":
            aufgabeDaten = add(val1,val2)
        break;
        case "addsub":
            //aufgabeDaten = addsub(val1,val2,explainer)  
            aufgabeDaten = addsub(val1,val2)
        break;
        case "frac":
            //aufgabeDaten = addsub(val1,val2,explainer)  
            aufgabeDaten = frac(val1,val2)
        break;
        case "lin1": 
           // aufgabeDaten = lin1(val1,val2,explainer)
           aufgabeDaten = lin1()
        break;
        case "lin2": 
            aufgabeDaten = lin2(val1,val2)
        break;
        case "lin3": 
            aufgabeDaten = lin3(val1,val2)
        break;    
        case "prop": 
            aufgabeDaten = prop(filter)
        break; 
        case "prozent": 
            aufgabeDaten = prozent(filter)
            //console.log(subfilter, filter)
        break; 
        case "linfun": 
            aufgabeDaten = linfun()
        break;   
        case "quad": 
            aufgabeDaten = quad()
            //console.log("quad!")
        break;      
        case "proba1": 
            aufgabeDaten = proba1()
        break; 
        default: 
            aufgabeDaten = add(val1,val2)
    }
    


    const processedTask = {
    //id: id,
    //templateid: id,
    text: `${aufgabeDaten[0]}`,
    answer: `${aufgabeDaten[1]}`,
    help: `${aufgabeDaten[2]}`,
    explainer: `${aufgabeDaten[3]}`,
    headerclass: `${aufgabeDaten[4]}`,
    //menu: `${aufgabeDaten[5]}`
    menu: aufgabeDaten[5]
    };
 
    return processedTask;
}
    
export default CreateTask;





    