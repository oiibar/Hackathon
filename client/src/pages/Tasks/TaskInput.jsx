// src/pages/Tasks/TaskInput.js
import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

const TaskInput = ({
  task,
  tags,
  deadline,
  author,
  setTask,
  setTags,
  setDeadline,
  setAuthor,
  handleCreateTask,
  currentDate,
}) => {
  return (
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
      <Button onClick={handleCreateTask} className="button">
        Create Task
      </Button>
    </div>
  );
};

export default TaskInput;
