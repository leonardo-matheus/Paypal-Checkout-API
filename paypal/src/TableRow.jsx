// TableRow.jsx
import React from 'react';

const TableRow = ({ data, handleRemoveItem, handleUpdateItem }) => {
  return (
    <tr>
      <td>
        <div className='product'>
          <img src="https://i.ibb.co/LZ1VRyP/1.png" alt="1" border="0"/>
          <div className='info'>
            <div className='name'>{data.name}</div>
            <div className='category'>{data.category}</div>
          </div>
        </div>
      </td>
      <td>R$ {data.price}</td>
      <td>
        <div className='qty'>
          <button
            onClick={() => {
              handleUpdateItem(data, 'decrease');
            }}
          >
            <i className='bx bx-minus'></i>
          </button>
          <span>{data.quantity}</span>
          <button
            onClick={() => {
              handleUpdateItem(data, 'increase');
            }}
          >
            <i className='bx bx-plus'></i>
          </button>
        </div>
      </td>
      <td>R$ {data.price * data.quantity}</td>
      <td>
        <button
          className='remove'
          onClick={() => {
            handleRemoveItem(data);
          }}
        >
          <i className='bx bx-x'></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
