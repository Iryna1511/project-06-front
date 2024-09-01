import "./Icons.css";

const Icons = ({ id, width, height, className = "" }) => {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
    >
      <use href={`/src/images/icons.svg#icon-${id}`}></use>
    </svg>
  );
};

export default Icons;