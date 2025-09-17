import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Task } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('devops-tasks', []);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTaskText('');
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="bg-slate-900/70 p-6 rounded-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
         <h3 className="text-xl font-bold text-slate-100">My Tasks</h3>
         <span className="text-sm font-medium bg-slate-700 text-sky-300 px-2 py-1 rounded-full">{pendingTasks} pending</span>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 bg-slate-800 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <button
          type="submit"
          className="p-2 bg-sky-600 rounded-md text-white hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          disabled={!newTaskText.trim()}
          aria-label="Add Task"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-md transition-colors ${
                task.completed ? 'bg-slate-800/50' : 'bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-sky-500 focus:ring-sky-500/50"
                />
                <span className={`transition-colors ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-slate-500 hover:text-red-500 transition-colors"
                aria-label={`Delete task: ${task.text}`}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};
