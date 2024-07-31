import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../../api/api";

const useTasks = (navigate) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [usernames, setUsernames] = useState("");
  const [tags, setTags] = useState("");
  const [deadline, setDeadline] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = window.localStorage.getItem("userId");
      if (!userId) {
        navigate("../login");
        return;
      }
      try {
        const response = await getTasks();
        const userTasks = response.data.filter(
          (task) => task.usernames === userId
        );
        setTasks(userTasks);
      } catch (error) {
        console.error(error);
      }
      setCurrentDate(formatDate());
    };

    fetchTasks();
  }, [navigate]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const userId = window.localStorage.getItem("userId");
    setUsernames(userId);
    if (!usernames || !author || !tags || !task || !deadline) {
      return;
    }

    try {
      await createTask({
        usernames,
        task: task.trim(),
        done: false,
        tags: tags.trim(),
        deadline,
        author: author.trim(),
      });
      setTask("");
      setTags("");
      setDeadline("");
      setAuthor("");
      setTasks([
        ...tasks,
        {
          usernames,
          task: task.trim(),
          done: false,
          tags: tags.trim(),
          deadline,
          author: author.trim(),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = async (taskId, taskData) => {
    try {
      await updateTask({ ...taskData, done: !taskData.done, id: taskId });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = () => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return {
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
  };
};

export default useTasks;
