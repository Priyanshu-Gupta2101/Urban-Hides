const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.bg} ${props.color}  border-2 ${props.border} rounded p-3.5 mr-2.5`}
    >
      {props.value}{" "}
    </button>
  );
};

export default Button;
