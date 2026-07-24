import taskTypes from './taskTypes';

function CreateTask(task) {

    const { type, subfilter } = task;

    let filter = subfilter ? subfilter-1 : " "
    //console.log("endfilter", filter)

    const taskType = taskTypes.find(t => t.type === type) || taskTypes.find(t => t.type === "add")

    return taskType.generate(filter);
}

export default CreateTask;
