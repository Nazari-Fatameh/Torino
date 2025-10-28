"use client";
import styles from "./ModalContainer.module.css";

function ModalContainer({
  children,
  isOpen,
  setIsOpen,
  showCloseButton = true,
  topElement = null,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        {showCloseButton && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={styles.closeButton}
          >
            ×
          </button>
        )}

        {topElement && <div className={styles.topButtonWrapper}>{topElement}</div>}

        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
