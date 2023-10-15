const Card = (props) => {
  return (
    <div
      className={
        `min-h-250 ` +
        props.color +
        ` m-5 rounded hover:scale-105 ease-in-out transition-all duration-500 cursor-pointer`
      }
    >
      <p className="p-8 text-4xl font-bold ">{props.text}</p>
      <img src={props.img} alt="product" className="w-1/2" />
    </div>
  );
};

export default Card;
