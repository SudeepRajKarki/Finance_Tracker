import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
