import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const useTasks = (navigate) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [tags, setTags] = useState("");
  const [deadline, setDeadline] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = window.localStorage.getItem("userId");
      if (!userId) {
        navigate("../login");
        toast.error("Please login first");
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

  const handleCreateTask = useCallback(
    async (e) => {
      e.preventDefault();
      const userId = window.localStorage.getItem("userId");
      if (
        !userId ||
        !author.trim() ||
        !tags.trim() ||
        !task.trim() ||
        !deadline
      ) {
        toast.error("Please fill all fields");
        return;
      }

      try {
        const newTask = {
          usernames: userId,
          task: task.trim(),
          done: false,
          tags: tags.trim(),
          deadline,
          author: author.trim(),
        };
        await createTask(newTask);
        toast.success("Task added successfully");

        // Reset fields
        setTask("");
        setTags("");
        setDeadline("");
        setAuthor("");

        // Update tasks list
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } catch (error) {
        console.error(error);
        toast.error("Failed to add task");
      }
    },
    [task, tags, deadline, author]
  );

  const handleDeleteTask = useCallback(async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCheck = useCallback(async (taskId, taskData) => {
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
  }, []);

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
