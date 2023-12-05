import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { deleteProject } from '../api'
import ProjectEditForm from '../Components/projecteditform'

export default function Project() {
  const { project, users } = useLoaderData()
  const [isEditing, setIsEditing] = useState(false)

  const [projectName, setProjectName] = useState(project?.name || '')
  const [projectDescription, setProjectDescription] = useState(
    project?.description || '',
  )
  const [projectType, setProjectType] = useState(project?.projectType || '')
  const [projectStatus, setProjectStatus] = useState(project?.status || '')

  useEffect(() => {
    document.title = `${projectName} | Details`
  }, [])

  const getParticipantNames = (participantIds) => {
    return participantIds.map((participantId) => {
      const user = users.find((user) => user.id === participantId)
      return user ? user.name : 'Unknown User'
    })
  }

  const participantsList = project ? project.participants : []
  const participantNames = getParticipantNames(participantsList)

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete the project?',
    )
    if (confirmDelete) {
      deleteProject(project.id)
    }
  }

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          projectId={project.id}
          projectName={projectName}
          setProjectName={setProjectName}
          projectDescription={projectDescription}
          setProjectDescription={setProjectDescription}
          projectType={projectType}
          setProjectType={setProjectType}
          projectStatus={projectStatus}
          setProjectStatus={setProjectStatus}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="container mt-4">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">{project?.name}</h1>
              <h5 className="card-subtitle mb-2 text-muted">
                {project?.description}
              </h5>
              <p className="card-text">
                <strong>Type:</strong> {project?.projectType}
              </p>
              <p className="card-text">
                <strong>Status:</strong> {project?.status}
              </p>
              <p className="card-text">
                <strong>Invited Participants:</strong>{' '}
                {participantNames
                  ? participantNames.join(', ')
                  : 'No participants have been invited.'}
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </button>

          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </>
  )
}
