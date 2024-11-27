const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { User, Family } = require('../db');
const { JWT_SECRET } = require('../config');
const authMiddleware = require('../middleware');

const router = express.Router();
router.use(express.json());

const signupBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(16),
    firstname: zod.string(),
    lastname: zod.string(),
    income: zod.number(),
    savings: zod.number(),
    MonthlyExpenses: zod.number(),
    LoanPayment: zod.number(),
    CreditCardPayment: zod.number(),
    FinancialGoalsMet: zod.number()
});

router.post("/signup", async (req, res) => {
    const validation = signupBody.safeParse(req.body);

    if (!validation.success) {
        console.log(validation.error.errors)
        return res.status(400).json({ message: "Invalid input" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(409).json({ message: "Email already taken" });
    }

    const family = await Family.create({
        income: req.body.income,
        savings: req.body.savings,
        MonthlyExpenses: req.body.MonthlyExpenses,
        LoanPayment: req.body.LoanPayment,
        CreditCardPayment: req.body.CreditCardPayment,
        Dependent: 1,
        FinancialGoalsMet: req.body.FinancialGoalsMet,
        TotalSpending: 0
    });

    const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        familyId: family._id,
        TotalSpending: 0
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ message: "User created successfully", token });
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const validation = signinBody.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({ token });
    } else {
        res.status(404).json({ message: "Invalid credentials" });
    }
});

const newuser = zod.object({
    email: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string()
})

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
}

router.put('/update-family', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const family = await Family.findById(user.familyId);
      if (!family) return res.status(404).json({ message: "Family not found" });
  
      const { income, savings, dependents } = req.body;
  
      if (income !== undefined) family.income = income;
      if (savings !== undefined) family.savings = savings;
      if (dependents !== undefined) family.Dependent = dependents;
  
      await family.save();
  
      res.status(200).json({ message: "Family details updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
router.get('/transactions', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const transactions = await Transaction.find({ FamilyId: user.familyId });
        res.status(200).json({ transactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/add',authMiddleware, async(req,res)=>{
    const validation = newuser.safeParse(req.body);
    if(!validation.success){
        return res.status(400).json({message: "Invalid Input"});
    }

    const password = generateRandomString(8);

    const user1 = await User.findOne({
        _id: req.userId
    })

    const user = await User.create({
        email: req.body.email,
        password: password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        familyId: user1.familyId,
        TotalSpending: 0
    });

    const family1 = await Family.findOne({
        _id: user.familyId
    })

    family1.Dependent = family1.Dependent + 1;
    await family1.save();

    return res.status(200).json({message: "New user added successfully"});
})

router.get('/family-details', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const family = await Family.findById(user.familyId);
        if (!family) {
            return res.status(404).json({ message: "Family not found" });
        }

        return res.status(200).json({
            message: "Family details retrieved successfully",
            familyDetails: {
                name: "The Family", // Placeholder; ideally, add a name field to Family schema
                income: family.income,
                savings: family.savings,
                totalExpenses: family.MonthlyExpenses + family.LoanPayment + family.CreditCardPayment,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/highest-spender', authMiddleware, async (req, res) => {
    try {
        // Get the logged-in user's details to find the familyId
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get all users in the same family
        const familyMembers = await User.find({ familyId: user.familyId });

        if (familyMembers.length === 0) {
            return res.status(404).json({ message: "No family members found" });
        }

        // Find the highest spender
        const highestSpender = familyMembers.reduce((max, member) => 
            member.TotalSpending > max.TotalSpending ? member : max
        );

        return res.status(200).json({
            message: "Highest spender retrieved successfully",
            highestSpender: {
                memberId: highestSpender._id,
                firstname: highestSpender.firstname,
                lastname: highestSpender.lastname,
                totalSpending: highestSpender.TotalSpending
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/member-contribution', authMiddleware, async (req, res) => {
    try {
        // Get the logged-in user's details to find the familyId
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get the family details
        const family = await Family.findById(user.familyId);
        if (!family) {
            return res.status(404).json({ message: "Family not found" });
        }

        // Get all users in the same family
        const familyMembers = await User.find({ familyId: user.familyId });

        // Calculate each member's contribution
        const totalFamilySpending = family.TotalSpending;
        const contributions = familyMembers.map(member => ({
            memberId: member._id,
            firstname: member.firstname,
            lastname: member.lastname,
            amount: member.TotalSpending,
            percentage: totalFamilySpending > 0 
                ? ((member.TotalSpending / totalFamilySpending) * 100).toFixed(2) 
                : 0
        }));

        return res.status(200).json({
            message: "Member-wise contribution retrieved successfully",
            totalFamilySpending,
            contributions
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
