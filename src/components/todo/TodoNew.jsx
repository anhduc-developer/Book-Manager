import { useState } from "react";

const TodoNew = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { addNewTodo } = props;
  const handleOnChange = (name) => {
    setValueInput(name);
  };
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };
  return (
    <div className="todo-new">
      <input
        type="text"
        placeholder="Enter your task"
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        value={valueInput}
      />
      <button style={{ cursor: "pointer" }} onClick={handleClick}>
        Add
      </button>
      <div id="my-text">My text input is = {valueInput} </div>
    </div>
  );
};
export default TodoNew;
