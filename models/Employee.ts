import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  position: string;
  department?: string;
  salary?: number;
}

const employeeSchema: Schema<IEmployee> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: String,
  salary: Number,
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
