import React from "react";

export default function Courses(props) {
  return (
    <>
      {props.cartVisible && <td>{props.cart}</td>}
      <td>{props.amount}</td>
      <td>
        <button
          onClick={() => props.editView(props._id)}
          className="btn btn-link"
        >
          <i class="bi bi-pencil-fill"></i>
        </button>
      </td>
      <td>
        <button
          onClick={() => props.deleteTheTransaction(props._id)}
          className="btn btn-link"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </>
  );
}
