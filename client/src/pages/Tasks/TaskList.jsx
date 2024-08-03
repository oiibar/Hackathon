// src/pages/Tasks/TaskList.js
import React from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Button from "../../components/Button";

const TaskList = ({ tasks, handleDeleteTask, handleCheck }) => {
  return (
    <>
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
    </>
  );
};

export default TaskList;
