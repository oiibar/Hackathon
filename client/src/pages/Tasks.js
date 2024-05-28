import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Tasks.css";

const Tasks = () => {
  // Setting all necessary states for further management
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const [usernames, setUsernames] = useState("");
  const [tags, setTags] = useState("");
  const [deadline, setDeadline] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [author, setAuthor] = useState("");
  //const [isEmpty, setIsEmpty] = useState(false);

  const navigate = useNavigate();

  // LogOut
  const handleLogOut = () => {
    window.localStorage.removeItem("userId");
    navigate("../login");
  };

  // Create
  const handleCreateTask = (e) => {
    const userId = window.localStorage.getItem("userId");
    setUsernames(userId);
    if (!usernames || !author || !tags || !task || !deadline) {
      return;
    } else {
      e.preventDefault();
    }

    axios
      .post("https://hackathon-task-list-server.onrender.com/create", {
        usernames,
        task: task.trim(),
        done: false,
        tags: tags.trim(),
        deadline,
        author: author.trim(),
      })
      .then((response) => {
        setTask("");
        setTags("");
        setDeadline("");
        setAuthor("");
      })
      .catch((e) => console.log(e));
  };

  // Delete
  const handleDeleteTask = (key) => {
    axios
      .post("https://hackathon-task-list-server.onrender.com/delete", {
        id: key,
      })
      .then(() => {
        // Update the state by removing the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== key));
      })
      .catch((e) => console.log(e));
  };

  // isTaskDone
  const handleCheck = (
    taskId,
    taskUsernames,
    taskTask,
    taskTags,
    taskDone,
    taskDeadline,
    taskAuthor
  ) => {
    axios
      .put("https://hackathon-task-list-server.onrender.com/change", {
        id: taskId,
        usernames: taskUsernames,
        task: taskTask,
        tags: taskTags,
        done: !taskDone,
        deadline: taskDeadline,
        author: taskAuthor,
      })
      .then(() => {
        // Update the state with the modified task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, done: !taskDone } : task
          )
        );
      })
      .catch((e) => console.log(e));
  };

  // Date 'yyyy-mm-dd'
  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  // Get
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");

    if (!userId) {
      navigate("../login");
      return;
    }

    axios
      .get("https://hackathon-task-list-server.onrender.com/tasks")
      .then((response) => {
        const userTasks = response.data.filter(
          (task) => task.usernames === userId
        );

        setTasks(userTasks);
      })
      .catch((e) => console.log(e));

    setCurrentDate(formatDate());
  }, [navigate, setCurrentDate]);

  return (
    <>
      <div className="wrapper">
        <h1>Tasks</h1>
        <button className="btn__create logOut" onClick={() => handleLogOut()}>
          Log Out
        </button>

        <input
          value={tags}
          placeholder="Tags"
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          value={deadline}
          type="Date"
          min={currentDate}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          value={author}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          value={task}
          placeholder="Task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          className="btn__create"
          onClick={(e) => handleCreateTask(e)}
        >
          Create Task
        </button>
        <br />
        <br />
        <br />
        <br />

        {!tasks.length ? (
          <p>There are no tasks yet</p>
        ) : (
          <div className="cards">
            {tasks?.map((task) => (
              <div className="card" key={task.id}>
                <div>
                  <ul className={task.done ? "done" : ""}>
                    <li>{task?.task}</li>
                    <li>{task?.tags}</li>
                    <li>{task?.deadline}</li>
                    <li>{task?.author}</li>
                  </ul>
                  <div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="btn__small bin"
                    >
                      <img className="icons" src="bin.png" alt="delete" />
                    </button>
                    <button
                      onClick={() =>
                        handleCheck(
                          task.id,
                          task.usernames,
                          task.task,
                          task.tags,
                          task.done,
                          task.deadline,
                          task.author
                        )
                      }
                      className={
                        task.done
                          ? "btn__small checked check"
                          : "btn__small check"
                      }
                    >
                      <img className="icons" src="check.png" alt="check" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
