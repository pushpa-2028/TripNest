import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

import {
  FaWallet,
  FaMoneyBillWave,
  FaChartPie,
  FaExclamationTriangle,
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaTag,
  FaEdit
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

  // =====================================
  // FETCH DATA
  // =====================================

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [id]);


  // =====================================
  // FETCH EXPENSES
  // =====================================

  const fetchExpenses = async () => {

    try {

      const response = await API.get(
        `/expenses/trip/${id}`
      );

      setExpenses(response.data);

    } catch (error) {

      console.log(
        "Fetch expenses error:",
        error
      );

      if (error.response) {
        console.log(
          "Server response:",
          error.response.data
        );
      }
    }
  };


  // =====================================
  // FETCH BUDGET SUMMARY
  // =====================================

  const fetchSummary = async () => {

    try {

      const response = await API.get(
        `/expenses/summary/${id}`
      );

      setSummary(response.data);

    } catch (error) {

      console.log(
        "Fetch summary error:",
        error
      );

      if (error.response) {
        console.log(
          "Server response:",
          error.response.data
        );
      }
    }
  };


  // =====================================
  // DELETE EXPENSE
  // =====================================

  const deleteExpense = async (expenseId) => {

    if (!window.confirm("Delete this expense?")) {
      return;
    }

    try {

      await API.delete(
        `/expenses/${expenseId}`
      );

      await fetchExpenses();
      await fetchSummary();

    } catch (error) {

      console.log(
        "Delete expense error:",
        error
      );

      if (error.response) {
        console.log(
          "Server response:",
          error.response.data
        );
      }
    }
  };


  // =====================================
  // RENDER
  // =====================================

  return (

    <div className="expensesPage">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="expenseHeader">

        <h1>
          💰 Trip Expenses
        </h1>

        <p>
          Track every expense and stay within your budget.
        </p>

      </div>


      {/* =====================================
          SUMMARY
      ===================================== */}

      <div className="summaryGrid">

        {/* BUDGET */}

        <div className="summaryCard budgetCard">

          <FaWallet className="summaryIcon" />

          <h3>
            Budget
          </h3>

          <p>
            ₹{Number(summary.budget).toLocaleString()}
          </p>

        </div>


        {/* SPENT */}

        <div className="summaryCard expenseCard">

          <FaMoneyBillWave className="summaryIcon" />

          <h3>
            Spent
          </h3>

          <p>
            ₹{Number(summary.totalExpense).toLocaleString()}
          </p>

        </div>


        {/* REMAINING */}

        <div className="summaryCard remainCard">

          <FaChartPie className="summaryIcon" />

          <h3>
            Remaining
          </h3>

          <p>
            ₹{Number(summary.remainingBudget).toLocaleString()}
          </p>

        </div>


        {/* PERCENTAGE */}

        <div className="summaryCard percentCard">

          <FaChartPie className="summaryIcon" />

          <h3>
            Used
          </h3>

          <p>
            {Number(summary.percentageUsed).toFixed(2)}%
          </p>

        </div>

      </div>


      {/* =====================================
          BUDGET WARNING
      ===================================== */}

      {summary.remainingBudget < 0 && (

        <div className="warningBanner">

          <FaExclamationTriangle />

          Budget Exceeded!

        </div>

      )}


      {/* =====================================
          ADD EXPENSE BUTTON
      ===================================== */}

      <button
        className="addExpenseBtn"
        onClick={() =>
          navigate(`/trip/${id}/add-expense`)
        }
      >

        <FaPlus />

        Add Expense

      </button>


      {/* =====================================
          EXPENSE LIST
      ===================================== */}

      <div className="expenseGrid">

        {expenses.length === 0 ? (

          /* =====================================
             EMPTY STATE
          ===================================== */

          <div className="emptyExpense">

            <div>
              💰
            </div>

            <h3>
              No Expenses Yet
            </h3>

            <p>
              Start tracking your travel expenses.
            </p>

            <button
              className="addExpenseBtn"
              onClick={() =>
                navigate(
                  `/trip/${id}/add-expense`
                )
              }
            >

              <FaPlus />

              Add Expense

            </button>

          </div>

        ) : (

          /* =====================================
             EXPENSE CARDS
          ===================================== */

          expenses.map((expense) => (

            <div
              className="expenseCardItem"
              key={expense.id}
            >

              {/* EXPENSE TOP */}

              <div className="expenseTop">

                <h2>
                  {expense.expenseName}
                </h2>

                <span className="amountBadge">

                  ₹{Number(
                    expense.amount
                  ).toLocaleString()}

                </span>

              </div>


              {/* EXPENSE INFORMATION */}

              <div className="expenseInfo">

                <p>

                  <FaTag />

                  {expense.category}

                </p>


                <p>

                  <FaCalendarAlt />

                  {expense.expenseDate}

                </p>

              </div>


              {/* NOTES */}

              <div className="expenseNotes">

                {expense.notes ||
                  "No notes added."}

              </div>


              {/* =====================================
                  ACTION BUTTONS
              ===================================== */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px"
                }}
              >

                {/* EDIT */}

                <button
                  className="editExpenseBtn"
                  onClick={() =>
                    navigate(
                      `/edit-expense/${expense.id}`
                    )
                  }
                >

                  <FaEdit />

                  Edit

                </button>


                {/* DELETE */}

                <button
                  className="deleteExpenseBtn"
                  onClick={() =>
                    deleteExpense(
                      expense.id
                    )
                  }
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Expenses;