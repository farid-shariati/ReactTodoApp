import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  editTodo,
  getSavedTodos,
  removeAll,
  unCompleteTodo,
} from "../../redux/action";
import {
  MdDelete,
  MdLens,
  MdModeEdit,
  MdPanoramaFishEye,
} from "react-icons/md";
import { toast } from "react-toastify";
import "./todo.css";

const Todo = () => {
  const [job, setJob] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [edited, setEdited] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosReducer.todos);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("list"));
    if (temp !== null) dispatch(getSavedTodos(temp));
    // eslint-disable-next-line
  }, []);

  const addJob = (job) => {
    if (job === "") {
      toast.error("Todo cannot be empty !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      dispatch(addTodo(job));
      setJob("");
      toast.info("Todo Added", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const onDeleteItem = (id) => {
    dispatch(deleteTodo(id));
    toast.success("Todo deleted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onEditEnable = (editedItem) => {
    setEditFlag(true);
    setJob(editedItem.job);
    setEdited(editedItem);
  };

  const editItem = () => {
    if (job === "") {
      alert("its empty !");
    } else {
      dispatch(editTodo(edited.id, job));
      setEditFlag(false);
      setJob("");
      toast.success("Todo edited successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const onDelete = () => {
    dispatch(removeAll());
    localStorage.removeItem("list");
    toast.error("all of todos deleted", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onComplete = (id) => {
    dispatch(completeTodo(id));
    toast.info("Yay ! its done ", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const onUnComplete = (id) => {
    dispatch(unCompleteTodo(id));
    toast.info("Todo changed to not complete ", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div className="main">
      <h2 className="title">What todo what not todo ?</h2>
      <input
        className="todo__input"
        type="text"
        placeholder="what ?"
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
      <button
        className="add__button"
        onClick={editFlag ? editItem : () => addJob(job)}
      >
        {editFlag ? "Edit" : "Add"}
      </button>
      {todos.length === 0 ? (
        <p className="no-job-text">There is no job todo !</p>
      ) : (
        todos?.map((item) => (
          <div className="todo-list" key={item.id}>
            <div
              className={
                item.isComplete ? "completed-item" : "not-completed-item"
              }
            >
              <p>{item.job}</p>
              <div className="icons">
                <div>
                  <MdDelete
                    className="icon"
                    size="1.2em"
                    onClick={() => onDeleteItem(item.id)}
                  />
                  <MdModeEdit
                    className="icon"
                    size="1.2em"
                    onClick={() => onEditEnable(item)}
                  />
                </div>
                <div>
                  {!item.isComplete ? (
                    <MdPanoramaFishEye
                      className="isComplete-Icon"
                      onClick={() => onComplete(item.id)}
                    />
                  ) : (
                    <MdLens
                      className="isComplete-Icon"
                      onClick={() => onUnComplete(item.id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div>
        {todos.length > 1 && (
          <button className="delete_all__button" onClick={onDelete}>
            Delete all
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
