import React, { useState } from 'react'
import { useEffect } from 'react'
import { createProject } from '../api'

export default function CreateProject() {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectType, setProjectType] = useState('survey')
  const [formErrors, setFormErrors] = useState({
    projectName: '',
    projectDescription: '',
    projectType: '',
  })

  useEffect(() => {
    document.title = 'Create Project'
  }, [])

  const validateForm = () => {
    let isValid = true
    const errors = {
      projectName: '',
      projectDescription: '',
      projectType: '',
    }

    if (!projectName) {
      errors.projectName = 'Name is required'
      isValid = false
    }

    if (!projectDescription) {
      errors.projectDescription = 'Description is required'
      isValid = false
    }

    if (!projectType) {
      errors.projectType = 'Type is required'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const projectStatus = 'active'
    const projectParticipants = []

    const formData = {
      projectName,
      projectDescription,
      projectType,
      projectStatus,
      projectParticipants,
    }

    createProject(formData)
      .then(() => {
        alert('Project created!')
      })
      .catch((error) => {
        console.error('Error updating project:', error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="projectName" className="form-label">
          Name
        </label>
        <input
          id="projectName"
          type="text"
          className={`form-control ${formErrors.projectName && 'is-invalid'}`}
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <div className="invalid-feedback">{formErrors.projectName}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="projectDescription" className="form-label">
          Description
        </label>
        <textarea
          id="projectDescription"
          type="text"
          className={`form-control ${
            formErrors.projectDescription && 'is-invalid'
          }`}
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
        />
        <div className="invalid-feedback">{formErrors.projectDescription}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="typeSelect" className="form-label">
          Type
        </label>
        <select
          id="typeSelect"
          className={`form-select ${formErrors.projectType && 'is-invalid'}`}
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
        >
          <option value="survey">Survey</option>
          <option value="focusgroup">Focus Group</option>
          <option value="interview">Interview</option>
        </select>
        <div className="invalid-feedback">{formErrors.projectType}</div>
      </div>

      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  )
}
