// routes/employeeRoutes.ts
import express, { Request, Response } from 'express';
import Employee from '../models/Employee'; // adjust path if needed

const app = express()

// DELETE /api/employees/:id
app.delete('/api/employees:id', async (req: Request, res: Response) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
      console.log(result);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete employee.' });
  }
});

export default app;
