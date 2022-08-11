import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Nav from './Navbar';
import AddTransaction from './AddTransaction';
import Expenses from './Expenses';
import './ProtectedApp.css';
import EditExpense from './EditExpense';
import Overlay from './Overlay';

const ProtectedApp = ({ username, password, userInfo }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesList, setExpensesList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [currItem, setCurrItem] = useState([]);

  const handleEdit = (e, id) => {
    const expense = expensesList.filter(expense => expense._id === id);
    setCurrItem([...expense]);
    setEditId(id);
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  // Render all current expenses on load
  useEffect(() => {
    axios
      .get('/api/get-expenses')
      .then(res => {
        setExpensesList([...res.data]);
        const total = expensesList.reduce(
          (acc, curr) => (acc += curr.amount),
          0
        );
        setTotalExpenses(total);
      })
      .catch(err => console.log(err));
  });
  return (
    <div>
      {openModal ? <Overlay /> : null};
      <header>
        <Nav userInfo={userInfo} totalExpenses={totalExpenses} />
      </header>
      <main className="main-container">
        <div className="edit-modal">
          {openModal ? (
            <EditExpense
              closeModal={closeModal}
              editId={editId}
              expensesList={expensesList}
              setExpensesList={setExpensesList}
              currItem={currItem}
            />
          ) : null}
        </div>
        <section className="expenses">
          <Expenses expensesList={expensesList} handleEdit={handleEdit} />
        </section>
        <section className="add-transaction">
          <AddTransaction
            expensesList={expensesList}
            setExpensesList={setExpensesList}
          />
        </section>
      </main>
    </div>
  );
};

export default ProtectedApp;
