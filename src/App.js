import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";
import Footer from "./components/Footer";
import { taskData } from "./mock/db";
function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(taskData);

  //Add Task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Add toggle reminder if double clicked on any task
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
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
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks To Show"
      )}
      <Footer />
    </div>
  );
}

export default App;
