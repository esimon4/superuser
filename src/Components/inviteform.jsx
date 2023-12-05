import React, { useState } from 'react'
import { addInvite } from '../api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function InviteForm({
  projects,
  onInviteSubmit,
  userPrices,
  userId,
}) {
  const [selectedProject, setSelectedProject] = useState('')
  const [estimatedCost, setEstimatedCost] = useState('')
  const [time, setTime] = useState('60')

  const handleProjectChange = (event) => {
    const selectedProjectValue = event.target.value
    setSelectedProject(selectedProjectValue)
    updateEstimatedCost(selectedProjectValue, time)
  }

  const handleTimeChange = (event) => {
    const selectedTimeValue = event.target.value
    setTime(selectedTimeValue)
    updateEstimatedCost(selectedProject, selectedTimeValue)
  }

  const updateEstimatedCost = (project, selectedTime) => {
    const projectInfo = projects.find((proj) => proj.name === project)

    if (projectInfo?.projectType === 'interview') {
      const timeValue = parseInt(selectedTime, 10) || 0
      const timeFraction = timeValue / 60
      const costPerHour = userPrices.interview
      const calculatedCost = timeFraction * costPerHour

      setEstimatedCost(calculatedCost.toString())
    } else if (projectInfo?.projectType === 'focusgroup') {
      const timeValue2 = parseInt(selectedTime, 10) || 0
      const timeFraction2 = timeValue2 / 60
      const costPerHour2 = userPrices.focusgroup
      console.log(costPerHour2)
      const calculatedCost2 = timeFraction2 * costPerHour2

      setEstimatedCost(calculatedCost2.toString())
    } else {
      setEstimatedCost('20')
    }
  }

  const handleInviteSubmit = (event) => {
    event.preventDefault()

    const project = projects.find((proj) => proj.name === selectedProject)
    console.log(project.id, userId)

    if (project && userId) {
      addInvite({
        projectId: project.id,
        userId: userId,
      })
        .then(() => {
          console.log('success')
          toast.success('Invite sent successfully!', {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        })
        .catch((error) => {
          console.error('Error sending invite:', error)
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        })
    } else {
      console.warn('Invalid selected project or user ID.')
    }
  }

  const isSubmitDisabled = !estimatedCost

  return (
    <div className="card mt-4">
      <ToastContainer />
      <div className="card-body">
        <h2>Invite to Project</h2>
        <form onSubmit={handleInviteSubmit}>
          <div className="mb-3">
            <label htmlFor="projectSelect" className="form-label">
              Select a Project:
            </label>

            <select
              id="projectSelect"
              className="form-select"
              value={selectedProject}
              onChange={handleProjectChange}
              required
            >
              <option value="" disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project.name} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>

            {selectedProject ? (
              <>
                {projects.find((proj) => proj.name === selectedProject)
                  ?.projectType &&
                !['interview', 'focusgroup'].includes(
                  projects.find((proj) => proj.name === selectedProject)
                    .projectType,
                ) ? null : (
                  <div>
                    <p>Interview/Focus Group Duration:</p>
                    <select
                      id="timeSelect"
                      className="form-select"
                      value={time}
                      onChange={handleTimeChange}
                      required
                    >
                      <option value="30">30 Minutes</option>
                      <option value="60">1 Hour</option>
                      <option value="90">One and a half hours</option>
                      <option value="120">Two Hours</option>
                    </select>
                  </div>
                )}
              </>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitDisabled}
          >
            Invite to Project
          </button>

          {selectedProject && (
            <p>
              <strong>Estimated Cost:</strong> ${estimatedCost}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
