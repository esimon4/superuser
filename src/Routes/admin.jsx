import React, { useState, useRef } from 'react'
import { useLoaderData } from 'react-router-dom'
import { deleteSelectedItems } from '../api'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const selectAllCheckboxRef = useRef()

  const loaderData = useLoaderData()

  React.useEffect(() => {
    setUsers(loaderData)
  }, [loaderData])

  const handleCheckboxChange = (id) => {
    const index = selectedItems.indexOf(id)
    if (index === -1) {
      setSelectedItems([...selectedItems, id])
    } else {
      const newSelectedItems = [...selectedItems]
      newSelectedItems.splice(index, 1)
      setSelectedItems(newSelectedItems)
    }
  }

  const handleSelectAll = () => {
    const allIds = users.map((user) => user.id)
    if (selectedItems.length === allIds.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(allIds)
    }
  }

  const handleDeleteSelected = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete the selected items?',
    )

    if (confirmDelete) {
      deleteSelectedItems(selectedItems)
        .then((data) => {
          setSelectedItems([])
          setUsers(data)
          alert('Selected items deleted successfully!')
        })
        .catch((error) => console.error('Error deleting data:', error))
    }
  }

  React.useEffect(() => {
    selectAllCheckboxRef.current.indeterminate =
      selectedItems.length > 0 && selectedItems.length < users.length
  }, [selectedItems, users])

  return (
    <div className="container mt-4">
      <h2>Admin</h2>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                className="form-check-input"
                type="checkbox"
                ref={selectAllCheckboxRef}
                onChange={handleSelectAll}
                checked={selectedItems.length === users.length}
              />
            </th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => handleCheckboxChange(user.id)}
                  checked={selectedItems.includes(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItems.length > 0 && (
        <button className="btn btn-danger" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      )}
    </div>
  )
}
