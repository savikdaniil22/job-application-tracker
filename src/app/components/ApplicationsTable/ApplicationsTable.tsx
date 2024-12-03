"use client";

import { useState, useEffect } from "react";
import AddApplicationModal from "../AddApplicationModal/AddApplicationModal";
import styles from "./ApplicationsTable.module.css";
import { Application } from "@/lib/types/interfaces";
import { fetchApplications, saveApplication, deleteApplication } from "@/app/api/applications/applicationService";

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchApplications();
        setApplications(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleAddApplication = async (data: Omit<Application, "_id">) => {
    setIsLoading(true);
    try {
      const newData = selectedApplication
        ? await saveApplication({ ...data, _id: selectedApplication._id }, true)
        : await saveApplication(data);

      setApplications((prev) =>
        selectedApplication
          ? prev.map((app) => (app._id === selectedApplication._id ? newData : app))
          : [...prev, newData]
      );
    } catch (err) {
      console.error("Failed to save application:", err);
      alert(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  };

  const handleDeleteApplication = async () => {
    if (!selectedApplication) return;

    setIsLoading(true);
    try {
      await deleteApplication(selectedApplication._id);
      setApplications((prev) => prev.filter((app) => app._id !== selectedApplication._id));
    } catch (err) {
      console.error("Error during deletion:", err);
      alert(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  };

  const rows = applications.map((application) => (
    <tr
      key={application._id}
      onClick={() => {
        setSelectedApplication(application);
        setIsModalOpen(true);
      }}
      className={styles.tableRow}>
      <td>{application.company}</td>
      <td>{application.position}</td>
      <td>{application.salaryRange}</td>
      <td>{application.status}</td>
      <td>{application.notes}</td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Salary Range</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className={styles.loaderRow}>
                  Loading...
                </td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </table>
        <button className={styles.addButton} onClick={handleOpenModal}>
          +
        </button>
        {isModalOpen && (
          <AddApplicationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddApplication}
            onDelete={selectedApplication ? handleDeleteApplication : undefined}
            application={selectedApplication}
          />
        )}
      </div>
    </div>
  );
}
