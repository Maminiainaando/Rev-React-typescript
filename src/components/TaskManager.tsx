import { useState } from "react";
import "./TaskManager.css";
import useTaskManager from "../hook/useTaskManager";

export const TaskManager: React.FC = () => {
  const { tasks, addTask, completeTask, updateTask, searchKeyword, handleSearch } = useTaskManager();

  const [title, setTitle] = useState<string>("");

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(ev.target.value);
  };

  const handleAddTask = (): void => {
    addTask(title);
    setTitle("");
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          value={searchKeyword}
          onChange={(ev) => handleSearch(ev.target.value)}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="container">
        {tasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
