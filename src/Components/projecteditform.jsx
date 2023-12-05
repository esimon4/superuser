import React from 'react'
import { editProject } from '../api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProjectEditForm = ({
  projectId,
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projectType,
  setProjectType,
  projectStatus,
  setProjectStatus,
  isEditing,
  setIsEditing,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = {
      projectId,
      projectName,
      projectDescription,
      projectType,
      projectStatus,
    }

    editProject(formData)
      .then(() => {
        alert('Updated successfully!')
      })
      .catch((error) => {
        console.error('Error updating project:', error)
      })
      .finally(() => {
        setIsEditing(!isEditing)
      })
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Edit Project Details</h5>

          <form onSubmit={handleSubmit}>
            <label htmlFor="projectName" className="form-label">
              Name
            </label>
            <input
              id="projectName"
              type="text"
              className="form-control"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />

            <label htmlFor="projectDescription" className="form-label">
              Description
            </label>
            <textarea
              id="projectDescription"
              type="text"
              className="form-control"
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
            />

            <label htmlFor="typeSelect" className="form-label">
              Type
            </label>
            <select
              id="typeSelect"
              className="form-select"
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              required
            >
              <option value="survey">Survey</option>
              <option value="focusgroup">Focus Group</option>
              <option value="interview">Interview</option>
            </select>

            <label htmlFor="statusSelect" className="form-label">
              Status
            </label>
            <select
              id="statusSelect"
              className="form-select"
              value={projectStatus}
              onChange={(event) => setProjectStatus(event.target.value)}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default ProjectEditForm
