import taskTypes from './taskTypes';

function CreateTask(task) {

    const { type, subtype } = task;

    let filter = subtype ? subtype-1 : " "
    //console.log("endfilter", filter)

    const taskType = taskTypes.find(t => t.type === type) || taskTypes.find(t => t.type === "add")

    return taskType.generate(filter);
}

export default CreateTask;
