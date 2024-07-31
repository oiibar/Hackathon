import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useTasks from "./useTasks";

const Tasks = () => {
  const navigate = useNavigate();
  const {
    tasks,
    task,
    setTask,
    tags,
    setTags,
    deadline,
    setDeadline,
    author,
    setAuthor,
    currentDate,
    handleCreateTask,
    handleDeleteTask,
    handleCheck,
  } = useTasks(navigate);

  return (
    <div className="layout">
      <Button
        onClick={() => {
          window.localStorage.removeItem("userId");
          navigate("../login");
        }}
        className="button absolute top-4 right-4"
      >
        Log Out
      </Button>

      <h1 className="title">Tasks</h1>

      <div className="flex flex-col gap-2 my-6">
        <Input
          value={tags}
          placeholder="Tags"
          onChange={(e) => setTags(e.target.value)}
          className="input mb-4"
        />
        <Input
          value={deadline}
          type="date"
          min={currentDate}
          onChange={(e) => setDeadline(e.target.value)}
          className="input mb-4"
        />
        <Input
          value={author}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          className="input mb-4"
        />
        <textarea
          value={task}
          placeholder="Task"
          onChange={(e) => setTask(e.target.value)}
          className="input p-2 resize-none"
        />
      </div>
      <Button onClick={(e) => handleCreateTask(e)} className="button">
        Create Task
      </Button>

      {!tasks.length ? (
        <p className="text-center text-gray-600 my-6">There are no tasks yet</p>
      ) : (
        <div className="flex gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border my-6 p-4 rounded-lg shadow-md bg-white"
            >
              <ul
                className={
                  task.done
                    ? "list-disc list-inside line-through text-gray-500"
                    : "list-disc list-inside"
                }
              >
                <li>{task.task}</li>
                <li>{task.tags}</li>
                <li>{task.deadline}</li>
                <li>{task.author}</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                  className="button bg-red-600"
                >
                  <MdDelete />
                </Button>
                <Button
                  onClick={() =>
                    handleCheck(task.id, {
                      usernames: task.usernames,
                      task: task.task,
                      tags: task.tags,
                      done: task.done,
                      deadline: task.deadline,
                      author: task.author,
                    })
                  }
                  className="bg-green-500"
                >
                  <FaCheck />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
