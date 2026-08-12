import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AddExpense.css";

function EditExpense() {
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
  const [loading, setLoading] = useState(true);

  // =====================================
  // FETCH EXPENSE
  // =====================================

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `https://tripnest-fird.onrender.com/api/expenses/${id}`
        );

        setExpense({
          expenseName: response.data.expenseName || "",
          category: response.data.category || "",
          amount: response.data.amount || "",
          expenseDate: response.data.expenseDate || "",
          notes: response.data.notes || ""
        });

      } catch (error) {
        console.log(error);
        setError("Failed to load expense.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

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
  // VALIDATE FORM
  // =====================================

  const validateForm = () => {
    if (!expense.expenseName.trim()) {
      return "Please enter an expense name.";
    }

    if (!expense.category.trim()) {
      return "Please enter an expense category.";
    }

    if (!expense.amount || Number(expense.amount) <= 0) {
      return "Expense amount must be greater than ₹0.";
    }

    if (!expense.expenseDate) {
      return "Please select an expense date.";
    }

    return "";
  };

  // =====================================
  // UPDATE EXPENSE
  // =====================================

  const updateExpense = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.put(
        `https://tripnest-fird.onrender.com/api/expenses/${id}`,
        expense
      );

      alert("Expense Updated Successfully!");

      navigate(-1);

    } catch (error) {
      console.log(error);

      setError(
        "Failed to update expense. Please try again."
      );
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="add-expense-container">
        <div className="add-expense-card">
          <h2>Loading Expense...</h2>
        </div>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="add-expense-container">

      <div className="add-expense-card">

        <h2>
          Edit Expense
        </h2>

        {/* ERROR */}

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

        <form onSubmit={updateExpense}>

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

          {/* DATE */}

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
          />

          {/* UPDATE */}

          <button type="submit">
            Update Expense
          </button>

          {/* CANCEL */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              marginTop: "10px",
              background: "#64748b"
            }}
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditExpense;