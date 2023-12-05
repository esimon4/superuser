import React, { useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Card } from '../Components/card'

export default function Account() {
  const projects = useLoaderData()

  useEffect(() => {
    document.title = 'Account'
  }, [])

  return (
    <div>
      <h1>Your Projects</h1>
      <div className="mb-3">
        <Link to="/create-project" className="btn btn-primary">
          Create New Project
        </Link>
      </div>

      {projects.map((project) => (
        <Card
          key={project.id}
          title={project.name}
          subtitle={project.projectType}
          link={`/project/${project.id}`}
          linkText="Read more"
        />
      ))}
    </div>
  )
}
