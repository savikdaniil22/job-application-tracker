import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  salaryRange: { type: String },
  status: { type: String, enum: ["Applied", "Interviewing", "Rejected", "Offer"], required: true },
  notes: { type: String },
});

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
