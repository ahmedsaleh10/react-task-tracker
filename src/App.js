import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import useTasks from "./components/useTasks";
import Footer from "./components/Footer";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const tasksArray = useTasks();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(tasksArray);
  }, [tasksArray]);

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //delete task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    res.status === 200
      ? setTasks(tasks.filter((task) => task._id !== id))
      : alert("Error Deleting This Task");
  };

  // Add toggle reminder if double clicked on any task
  const toggleFinished = async (id) => {
    const updatedTask = tasks.filter((task) => task._id === id && {...task} );
    let updatedTaskObject = updatedTask[0]
    updatedTaskObject = {...updatedTaskObject , finished : !updatedTaskObject.finished}

    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTaskObject),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, finished: data.finished } : task
      )
    );
  };

  const onAdd = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <div className="container">
      <Header title={"Task Tracker"} onClick={onAdd} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleFinished} />
      ) : (
        "No Tasks To Show"
      )}
      <Footer />
    </div>
  );
}

export default App;
