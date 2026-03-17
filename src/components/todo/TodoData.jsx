const TodoData = (props) => {
  const { todoList, handleDelete } = props;
  const handleClick = (id) => {
    handleDelete(id);
  };
  return (
    <div className="todo-data">
      {todoList.map((item) => (
        <div className="todo-item" key={item.id}>
          <div>{item.name}</div>
          <button onClick={() => handleClick(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default TodoData;
