"use client";

import { useState } from "react";
import AddApplicationModal from "../AddApplicationModal/AddApplicationModal";
import styles from "./ApplicationsTable.module.css";

interface Application {
  id: number;
  company: string;
  position: string;
  salaryRange: string;
  status: string;
  notes: string;
}

const initialApplications: Application[] = [
  {
    id: 1,
    company: "TechCorp",
    position: "Frontend Developer",
    salaryRange: "$60,000 - $80,000",
    status: "Interviewing",
    notes: "First-round completed",
  },
  {
    id: 2,
    company: "Innovatech",
    position: "Backend Developer",
    salaryRange: "$70,000 - $90,000",
    status: "Applied",
    notes: "Waiting for response",
  },
  {
    id: 3,
    company: "SoftSolutions",
    position: "Full Stack Developer",
    salaryRange: "$75,000 - $100,000",
    status: "Offer Received",
    notes: "Offer under review",
  },
];

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleOpenModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleAddApplication = (data: Application) => {
    if (selectedApplication) {
      setApplications((prev) => prev.map((app) => (app.id === selectedApplication.id ? { ...app, ...data } : app)));
    } else {
      setApplications((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDeleteApplication = () => {
    if (selectedApplication) {
      setApplications((prev) => prev.filter((app) => app.id !== selectedApplication.id));
    }
    handleCloseModal();
  };

  const rows = applications.map((application) => (
    <tr
      key={application.id}
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
          <tbody>{rows}</tbody>
        </table>{" "}
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
