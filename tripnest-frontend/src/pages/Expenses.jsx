import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaWallet,
  FaMoneyBillWave,
  FaChartPie,
  FaExclamationTriangle,
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaTag
} from "react-icons/fa";

import "../styles/Expenses.css";

function Expenses() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({
        budget: 0,
        totalExpense: 0,
        remainingBudget: 0,
        percentageUsed: 0
    });

    useEffect(() => {
        fetchExpenses();
        fetchSummary();
    }, []);

    const fetchExpenses = async () => {
        try {

            const response = await axios.get(
                `https://tripnest-fird.onrender.com/api/expenses/trip/${id}`
            );

            setExpenses(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchSummary = async () => {
        try {

            const response = await axios.get(
                `https://tripnest-fird.onrender.com/api/expenses/summary/${id}`
            );

            setSummary(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteExpense = async (expenseId) => {

        if (!window.confirm("Delete this expense?")) return;

        try {

            await axios.delete(
                `https://tripnest-fird.onrender.com/api/expenses/${expenseId}`
            );

            fetchExpenses();
            fetchSummary();

        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div className="expensesPage">

            <div className="expenseHeader">

                <h1>💰 Trip Expenses</h1>

                <p>Track every expense and stay within your budget.</p>

            </div>

            <div className="summaryGrid">

                <div className="summaryCard budgetCard">
                    <FaWallet className="summaryIcon"/>
                    <h3>Budget</h3>
                    <p>₹{Number(summary.budget).toLocaleString()}</p>
                </div>

                <div className="summaryCard expenseCard">
                    <FaMoneyBillWave className="summaryIcon"/>
                    <h3>Spent</h3>
                    <p>₹{Number(summary.totalExpense).toLocaleString()}</p>
                </div>

                <div className="summaryCard remainCard">
                    <FaChartPie className="summaryIcon"/>
                    <h3>Remaining</h3>
                    <p>₹{Number(summary.remainingBudget).toLocaleString()}</p>
                </div>

                <div className="summaryCard percentCard">
                    <FaChartPie className="summaryIcon"/>
                    <h3>Used</h3>
                    <p>{summary.percentageUsed.toFixed(2)}%</p>
                </div>

            </div>

            {summary.remainingBudget < 0 && (

                <div className="warningBanner">

                    <FaExclamationTriangle/>

                    Budget Exceeded!

                </div>

            )}

            <button
                className="addExpenseBtn"
                onClick={() => navigate(`/trip/${id}/add-expense`)}
            >
                <FaPlus/>
                Add Expense
            </button>

            <div className="expenseGrid">

                {expenses.length === 0 ? (

                    <div className="emptyExpense">

                        💰

No Expenses Yet

Start tracking your travel expenses.

[ Add Expense ]

                    </div>

                ) : (

                    expenses.map((expense) => (

                        <div
                            className="expenseCardItem"
                            key={expense.id}
                        >

                            <div className="expenseTop">

                                <h2>{expense.expenseName}</h2>

                                <span className="amountBadge">

                                    ₹{expense.amount}

                                </span>

                            </div>

                            <div className="expenseInfo">

                                <p>

                                    <FaTag/>

                                    {expense.category}

                                </p>

                                <p>

                                    <FaCalendarAlt/>

                                    {expense.expenseDate}

                                </p>

                            </div>

                            <div className="expenseNotes">

                                {expense.notes}

                            </div>

                            <button
                                className="deleteExpenseBtn"
                                onClick={() => deleteExpense(expense.id)}
                            >
                                <FaTrash/>

                                Delete

                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default Expenses;
