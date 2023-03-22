import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props.column_type_options.Option1_number
  );

  function handleOptionClick(option) {
    setSelectedOption(option);
    props.setColumnType(option);
    props.handleChange(props.id, props.schemaField, option);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__header} onClick={toggleDropdown}>
        {selectedOption}&nbsp;&nbsp;
        <i className={`fa fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && (
        <div className={styles.dropdown__options}>
          {Object.entries(props.column_type_options).map(([key, value]) => (
            <div
              key={key}
              className={styles.dropdown__option}
              onClick={() => handleOptionClick(value)}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
