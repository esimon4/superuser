import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { createComment } from '../api'
import InviteForm from '../Components/inviteform'
import CommentSection from '../Components/reviewsection'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function User() {
  const { user, projects } = useLoaderData()
  const [newComment, setNewComment] = useState({ name: '', body: '' })

  useEffect(() => {
    document.title = `${user.name} | Details`
  }, [])

  const handleCommentSubmit = (event) => {
    event.preventDefault()

    const timestamp = new Date().toISOString()
    const commentWithTimestamp = { ...newComment, timestamp, userId: user.id }

    const updatedComments = user.comments
      ? [...user.comments, commentWithTimestamp]
      : [commentWithTimestamp]

    createComment(commentWithTimestamp)
      .then((response) => {
        toast.success('Review submitted successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      })
      .catch((error) => {
        console.error('Error creating comment:', error)
      })
    setNewComment({ name: '', body: '' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewComment((prevComment) => ({ ...prevComment, [name]: value }))
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{user.name}</h1>
          <h5 className="card-subtitle mb-2 text-muted">
            Age {user.age}, located in {user.location}
          </h5>
          <p className="card-text">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="card-text">
            <strong>Interests:</strong> {user.interests.join(', ')}
          </p>
          <p className="card-text">
            <strong>Availability:</strong> {user.availability}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {user.contactInformation.email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {user.contactInformation.phone}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {user.description}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {user.location}
          </p>
        </div>
      </div>

      <InviteForm
        projects={projects}
        userPrices={user.prices}
        userId={user.id}
      />

      <div className="card mt-4">
        <div className="card-body">
          <CommentSection
            newComment={newComment}
            handleCommentSubmit={handleCommentSubmit}
            handleInputChange={handleInputChange}
            user={user}
          />
        </div>

        <ToastContainer />
      </div>
    </div>
  )
}
