
import Styles from "./Product.module.css";
import PropTypes from "prop-types";

const Status = ({ handleStatus }) => {
  const handleChange = (e) => {
    const newStatus = e.target.value;
    handleStatus(newStatus);
  };

  return (
    <>
    <div className={Styles["main2"]}>
      My Todos </div>
      <label htmlFor="status" className={Styles["label"]}>
        Filter Status:
      </label>
      <select
        className={Styles["status-select"]}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="Not Completed">Not Completed</option>
        <option value="Completed">Completed</option>
      </select>
      </>
  );
};

Status.propTypes = {
  handleStatus: PropTypes.func,
};

export default Status;