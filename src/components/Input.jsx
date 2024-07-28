const Input = ({ value, type, placeholder, id, name, onChange }) => {
  return (
    <input
      className="h-10 w-full border rounded-md p-2 mt-3 outline-none"
      value={value}
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
