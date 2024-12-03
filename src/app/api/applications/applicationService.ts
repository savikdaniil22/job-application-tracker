import { Application } from "@/lib/types/interfaces";

export const fetchApplications = async (): Promise<Application[]> => {
  const res = await fetch("/api/applications");
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
};

export const saveApplication = async (
  data: Omit<Application, "_id"> | Application,
  isUpdate = false
): Promise<Application> => {
  const method = isUpdate ? "PUT" : "POST";
  const body = JSON.stringify(data);

  const res = await fetch("/api/applications", {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to save application");
  }

  return res.json();
};

export const deleteApplication = async (id: string): Promise<void> => {
  const res = await fetch(`/api/applications`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete application");
  }
};
