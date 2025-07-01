const Button = ({ label, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ${className}`}
  >
    {label}
  </button>
);

export default Button;
