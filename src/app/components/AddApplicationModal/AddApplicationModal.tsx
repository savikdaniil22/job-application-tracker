import React, { useEffect, useState } from "react";
import styles from "./AddApplicationModal.module.css";
import { Application } from "@/lib/types/interfaces";
import { ModalProps } from "@/lib/types/interfaces";

export default function AddApplicationModal({ isOpen, onClose, onSubmit, onDelete, application }: ModalProps) {
  const [formData, setFormData] = useState<Omit<Application, "_id">>({
    company: "",
    position: "",
    salaryRange: "",
    status: "Applied",
    notes: "",
  });

  useEffect(() => {
    if (application) {
      const { _id, ...rest } = application;
      setFormData(rest);
    } else {
      setFormData({
        company: "",
        position: "",
        salaryRange: "",
        status: "Applied",
        notes: "",
      });
    }
  }, [application]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
              value={formData.company || ""}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={formData.position || ""}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Salary Range:</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange || ""}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.inputField}
              required>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Notes:</label>
            <input
              type="text"
              name="notes"
              value={formData.notes || ""}
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
