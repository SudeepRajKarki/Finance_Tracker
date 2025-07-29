import Income from '../models/income.js';

export const addIncome = async (req, res) => {

  const { source, amount, date } = req.body;

  try {
    const income = new Income({
      user: req.user._id,
      source,
      amount,
      date: date || Date.now(),
    });

    await income.save();

    res.status(201).json(income);
  } catch (err) {
    console.error("Error in addIncome:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    res.json({ message: 'Income deleted successfully' });
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




