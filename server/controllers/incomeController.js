import Income from '../models/income.js';

export const addIncome = async (req, res) => {
  console.log("📥 Incoming income request");
  console.log("👤 req.user:", req.user);
  console.log("📄 req.body:", req.body);

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
    console.error("❌ Error in addIncome:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all income for logged-in user
export const getIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
