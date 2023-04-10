import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react"
import Footer from "./components/Footer";

function App() {

  const[showAddTask,setShowAddTask] = useState(false)
  const[tasks,setTasks]=useState([])

  useEffect ( () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

//Featching method

const fetchTasks = async () => {
  const responce = await fetch('http://localhost:5000/tasks')
  const data = await responce.json()
 
  return data
}

const fetchTask = async (id) => {
  const responce = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await responce.json()
 
  return data
}

//Add Task
const addTask = async (task)=> {
  const res = await fetch(`http://localhost:5000/tasks`, {method : 'POST' , headers:{'Content-type' : "application/json"} , body: JSON.stringify(task)})
  const data = await res.json()

  setTasks ([...tasks,data])
}

//delete task
const deleteTask = async (id)=> {
  
  await fetch(`http://localhost:5000/tasks/${id}`, {method : 'Delete'})
  setTasks(tasks.filter((task)=> task.id !== id))
}

// Add toggle reminder if double clicked on any task
const toggleReminder = async (id)=> {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle , reminder : !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {method : 'PUT' , headers:{'Content-type' : "application/json"} , body: JSON.stringify(updTask)})

  const data = await res.json()

  setTasks(
    tasks.map((task)=> 
    task.id === id ? {...task, reminder: data.reminder} : task
    )
  )

}

const onAdd = () => {
  setShowAddTask(!showAddTask)
}

  return (
    <div className="container">
       <Header title={"Task Tracker"} onClick={onAdd} showAdd={showAddTask}/>
       {showAddTask && <AddTask onAdd={addTask} />}
       {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No Tasks To Show"}
       <Footer />
    </div>
  );
  }

export default App;
