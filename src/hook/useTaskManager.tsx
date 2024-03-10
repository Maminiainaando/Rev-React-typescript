import { useState } from "react";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  title: string;
}

const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const addTask = (title: string): void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...taskUpdate } : task))
    );
  };

  const handleSearch = (keyword: string): void => {
    setSearchKeyword(keyword);
  };

  const filteredTasks: Task[] = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks: filteredTasks,
    addTask,
    completeTask,
    updateTask,
    searchKeyword,
    handleSearch,
  };
};

export default useTaskManager;