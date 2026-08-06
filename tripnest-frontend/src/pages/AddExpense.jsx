import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AddExpense.css";

function AddExpense() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        expenseName: "",
        category: "",
        amount: "",
        expenseDate: "",
        notes: ""
    });

    const [error, setError] = useState("");


    // =====================================
    // HANDLE INPUT CHANGE
    // =====================================

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });

        setError("");
    };


    // =====================================
    // VALIDATE EXPENSE
    // =====================================

    const validateForm = () => {

        if (!expense.expenseName.trim()) {
            return "Please enter an expense name.";
        }

        if (!expense.category.trim()) {
            return "Please enter an expense category.";
        }

        if (
            !expense.amount ||
            Number(expense.amount) <= 0
        ) {
            return "Expense amount must be greater than ₹0.";
        }

        if (!expense.expenseDate) {
            return "Please select an expense date.";
        }

        return "";
    };


    // =====================================
    // ADD EXPENSE
    // =====================================

    const addExpense = async (e) => {

        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {

            setError(validationError);

            return;
        }

        try {

            await axios.post(
                `http://https://tripnest-fird.onrender.com/api/expenses/${id}`,
                expense
            );

            alert(
                "Expense Added Successfully!"
            );

            navigate(
                `/trip/${id}/expenses`
            );

        } catch (error) {

            console.log(error);

            setError(
                "Failed to add expense. Please try again."
            );
        }
    };


    return (

        <div className="add-expense-container">

            <div className="add-expense-card">

                <h2>
                    Add Expense
                </h2>


                {/* VALIDATION ERROR */}

                {error && (

                    <div
                        style={{
                            background: "#ffebee",
                            color: "#c62828",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "18px",
                            textAlign: "center"
                        }}
                    >
                        {error}
                    </div>

                )}


                <form onSubmit={addExpense}>


                    {/* EXPENSE NAME */}

                    <input
                        type="text"
                        name="expenseName"
                        placeholder="Expense Name"
                        value={expense.expenseName}
                        onChange={handleChange}
                    />


                    {/* CATEGORY */}

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={expense.category}
                        onChange={handleChange}
                    />


                    {/* AMOUNT */}

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={handleChange}
                        min="1"
                    />


                    {/* EXPENSE DATE */}

                    <label>
                        Expense Date
                    </label>

                    <input
                        type="date"
                        name="expenseDate"
                        value={expense.expenseDate}
                        onChange={handleChange}
                    />


                    {/* NOTES */}

                    <textarea
                        name="notes"
                        placeholder="Notes (Optional)"
                        rows="4"
                        value={expense.notes}
                        onChange={handleChange}
                    >
                    </textarea>


                    {/* SAVE BUTTON */}

                    <button type="submit">

                        Save Expense

                    </button>

                </form>

            </div>

        </div>

    );
}

export default AddExpense;