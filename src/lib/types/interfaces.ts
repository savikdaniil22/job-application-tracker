export interface Application {
  _id: string;
  company: string;
  position: string;
  salaryRange: string;
  status: string;
  notes: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Application, "_id">) => void;
  onDelete?: () => void;
  application: Application | null;
}
