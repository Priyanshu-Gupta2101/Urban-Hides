const Flash = (props) => {
  return (
    <p
      id="flash"
      className={`fixed -top-28 left-2/4 -translate-x-2/4 z-50 text-center text-white ${props.flash.bg} p-2 rounded duration-500`}
    >
      {props.flash.message}
    </p>
  );
};

export default Flash;
