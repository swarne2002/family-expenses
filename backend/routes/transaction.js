const express = require('express');
const zod = require('zod');
const authMiddleware = require('../middleware');
const { User, Family, Transaction } = require('../db');

const router = express.Router();
router.use(express.json());

const transactionBody = zod.object({
    TransactionDate: zod.string(),
    Catagory: zod.string(),
    Amount: zod.number()
});

router.post('/addtransaction', authMiddleware, async (req, res) => {
    const validation = transactionBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const transaction = await Transaction.create({
        TransactionDate: req.body.TransactionDate,
        Catagory: req.body.Catagory,
        FamilyId: user.familyId,
        UserId: user._id,
        Amount: req.body.Amount
    });

    const family = await Family.findById(user.familyId);

    family.TotalSpending += transaction.Amount;
    user.TotalSpending += transaction.Amount;

    await family.save();
    await user.save();

    res.json({ message: "Transaction added successfully" });
});

module.exports = router;
