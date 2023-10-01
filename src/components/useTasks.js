import { useEffect, useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getTasks();
  }, []);

  return tasks;
};

export default useTasks;
