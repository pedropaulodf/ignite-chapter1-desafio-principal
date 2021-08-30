import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle === "") {
      // Mostra o erro
      setErrorMessage(true);
      return false;

    } else {
      // Esconde o erro
      setErrorMessage(false);
      // Gera um id aleatório unico
      let randomId = Math.ceil(Math.random() * new Date().getTime());
      // Seta o estado
      setTasks([...tasks, {id: randomId, title: newTaskTitle, isComplete: false}]);
    }

    // Limpa o input
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskChecked = tasks;
    // Encontra o Index do elemento
    const index = taskChecked.findIndex(task => task.id === id);
    // Marca como true o checked
    taskChecked[index].isComplete = !taskChecked[index].isComplete;
    // Seta o estado
    setTasks([...taskChecked]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskRemoved = tasks;
    // Encontra o Index do elemento
    const index = taskRemoved.findIndex(task => task.id === id);
    // Remove o elemento pelo index
    taskRemoved.splice(index, 1);
    // Seta o estado
    setTasks([...taskRemoved]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      {errorMessage && 
        <div className="error-message-box">
          <span className="error-message">Campo não pode estar vazio</span>
        </div>
      }

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
