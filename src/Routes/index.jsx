import React, { useState, useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Card } from '../Components/card'

export default function Index() {
  const { users, projects } = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.interests.some((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <div>
      <br />
      <h2>Active Projects</h2>
      <br />
      {projects
        .filter((project) => project.status === 'active')
        .map((project) => (
          <Card
            key={project.name}
            title={project.name}
            text={project.description}
            link={`/project/${project.id}`}
            linkText="Details"
          />
        ))}

      <br />
      <hr />
      <br />

      <h2>Browse Users</h2>
      <br />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name, interests, or location"
          className="form-control py-3"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {filteredUsers.map((user) => (
        <Card
          key={user.id}
          title={user.name}
          subtitle={user.location}
          link={`/user/${user.id}`}
          linkText="Details"
        />
      ))}
    </div>
  )
}
