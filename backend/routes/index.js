const express = require('express');
const transactionRouter = require('./transaction');
const userRouter = require('./user');

const router = express.Router();

router.use('/transaction', transactionRouter);
router.use('/user', userRouter);

module.exports = router;
