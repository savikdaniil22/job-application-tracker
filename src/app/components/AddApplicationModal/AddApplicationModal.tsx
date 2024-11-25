import React, { useEffect, useState } from "react";
import styles from "./AddApplicationModal.module.css";

interface Application {
  id: number;
  company: string;
  position: string;
  salaryRange: string;
  status: string;
  notes: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Application) => void;
  onDelete?: () => void;
  application?: Application | null;
}

export default function AddApplicationModal({ isOpen, onClose, onSubmit, onDelete, application }: ModalProps) {
  const [formData, setFormData] = useState<Application>({
    id: Date.now(),
    company: "",
    position: "",
    salaryRange: "",
    status: "",
    notes: "",
  });

  useEffect(() => {
    if (application) {
      setFormData(application);
    } else {
      setFormData({
        id: Date.now(),
        company: "",
        position: "",
        salaryRange: "",
        status: "",
        notes: "",
      });
    }
  }, [application]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{application ? "Edit Application" : "Add New Application"}</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Salary Range:</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Notes:</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {onDelete && (
              <button type="button" onClick={onDelete} className={styles.buttonDelete}>
                Delete
              </button>
            )}
            <button type="button" onClick={onClose} className={styles.buttonCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.buttonAdd}>
              {application ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
