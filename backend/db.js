const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://swarne2002:Mongodb2002@cluster0.m7uwziy.mongodb.net/FamilyExp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const FamilySchema = new mongoose.Schema({
    income: { type: Number, required: true },
    savings: { type: Number, required: true },
    MonthlyExpenses: { type: Number, required: true },
    LoanPayment: { type: Number, required: true },
    CreditCardPayment: { type: Number, required: true },
    Dependent: { type: Number, required: true },
    FinancialGoalsMet: { type: Number, required: true },
    TotalSpending: { type: Number, required: true }
});

const Family = mongoose.model('Family', FamilySchema);

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
    TotalSpending: { type: Number, required: true }
});

const User = mongoose.model('User', UserSchema);

const TransactionSchema = new mongoose.Schema({
    TransactionDate: { type: String, required: true },
    Catagory: { type: String, required: true },
    FamilyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Amount: { type: Number, required: true }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { User, Family, Transaction };
