
 import Styles from "./Product.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

function Cards({ id, name, description, status, deleteCard, handleStatusChange, editCard }) {
  const [localStatus, setLocalStatus] = useState(status);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setLocalStatus(newStatus);
    handleStatusChange(id, newStatus);
  };

  const handleEdit = () => {
    editCard({ id, name, description, status: localStatus });
  };

  return (
    <div className={Styles["product-container"]}>
      <div className={Styles["name"]}>Name: {name}</div>
      <div className={Styles["description"]}>Description: {description}</div>
      <label htmlFor="status" className={Styles["status"]}>
        Status:
      </label>
      <select
        className={Styles["options"]}
        onChange={handleChange}
        value={localStatus}
      >
        <option value="Not Completed">Not Completed</option>
        <option value="Completed">Completed</option>
      </select>
      <div className={Styles["button-container"]}>
        <button className={Styles["btn1"]} onClick={handleEdit}>
          Edit
        </button>
        <button className={Styles["btn2"]} onClick={() => deleteCard(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

Cards.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.string,
  deleteCard: PropTypes.func,
  handleStatusChange: PropTypes.func,
  editCard: PropTypes.func,
};

export default Cards;