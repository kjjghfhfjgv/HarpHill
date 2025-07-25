import React from "react";
import styles from "./styles.module.css";
import { X } from "lucide-react";

const CitySuggestions = ({
  suggestions,
  isLoading,
  onSelect,
  open,
  onHide,
}) => {
  if (!open) return;
  console.log({ isLoading });

  if (isLoading) {
    return (
      <div className={styles.suggestions}>
        <div className={styles.dropdown}>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isLoading && suggestions.length === 0) {
    return (
      <div className={styles.suggestions}>
        <div className={styles.dropdown}>
          <div className="loading">No cities found</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.suggestions}>
      <div className={styles.dropdown}>
        {suggestions.map((city) => (
          <button
            key={city.id}
            className={styles.dropdownItem}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(city.name);
            }}
          >
            {city.name}
          </button>
        ))}
      </div>
      <button className={styles.close} onClick={onHide}>
        <X width={15} height={15} />
      </button>
    </div>
  );
};

export default CitySuggestions;
