import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletecalculation, getAllCalculations } from '../../store/History/calculationSlice';
import './HistoryComponent.css'

const HistoryComponent = () => {
  const dispatch = useDispatch();
  const { authToken } = useSelector(state => state.auth);
  const { history } = useSelector(state => state.calculation);
  const onDelete = (id) => {
    dispatch(deletecalculation({ id, authToken }));
  }
  useEffect(() => {
    dispatch(getAllCalculations(authToken));
  }, [authToken, dispatch])
  return (
    <div id="history" className="history">
      <h2 style={{ fontStyle: "monospace" }} >History</h2>
      <div>
        <button className="clear-history-btn" >
          Clear
        </button>
        <button onClick={() => { document.getElementById("history").style.display = "none" }} className="hide-history-btn" >
          Hide History
        </button>
      </div>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <span>{item.expression} =</span>
              <span>{item.result}</span>
              <button className="delete-btn" onClick={() => onDelete(item._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history yet.</p>
      )}
    </div>
  );
}

export default HistoryComponent