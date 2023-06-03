import add from './components/add';
import addsub from './components/addsub';
import frac from './components/frac';
import lin1 from './components/lin1';
import lin2 from './components/lin2';
import lin3 from './components/lin3';
import prop from './components/prop';
import linfun from './components/linfun';
import quad from './components/quad';

function CreateTask(task) {
    // const { id, type, val1, val2, explainer } = task;
    // const { id, type, val1, val2 } = task;
    const { type, val1, val2, explainer } = task;
    let aufgabeDaten = []
    //aufgabeDaten = add(val1,val2)
    //console.log(type)
 
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
            aufgabeDaten = lin1(val1,val2,explainer)
        break;
        case "lin2": 
            aufgabeDaten = lin2(val1,val2)
        break;
        case "lin3": 
            aufgabeDaten = lin3(val1,val2)
        break;    
        case "prop": 
            aufgabeDaten = prop()
        break;   
        case "linfun": 
            aufgabeDaten = linfun()
        break;   
        case "quad": 
            aufgabeDaten = quad()
            console.log("quad!")
        break;      
        default: 
            aufgabeDaten = add(val1,val2)
    }
    
    const processedTask = {
    //id: id,
    //templateid: id,
    text: `${aufgabeDaten[0]}`,
    help: `${aufgabeDaten[2]}`,
    answer: `${aufgabeDaten[1]}`,
    explainer: `${aufgabeDaten[3]}`
    };
 
    return processedTask;
}
    
export default CreateTask;





    