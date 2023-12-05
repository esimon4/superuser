import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const CommentSection = ({
  newComment,
  handleCommentSubmit,
  handleInputChange,
  user,
}) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false)

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen)
  }

  const renderTriggerIcon = (isOpen) => {
    return (
      <FontAwesomeIcon
        icon={isOpen ? faMinus : faPlus}
        style={{ marginLeft: '5px' }}
      />
    )
  }

  return (
    <div>
      <div
        onClick={toggleAccordion}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <h3 style={{ marginTop: 10, marginBottom: 10 }}>User Reviews</h3>
        {renderTriggerIcon(isAccordionOpen)}
      </div>
      {isAccordionOpen && (
        <div>
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <h4>Submit a review</h4>
              <label htmlFor="commentorName" className="form-label">
                Your Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="commentorName"
                name="name"
                value={newComment.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="commentBody" className="form-label">
                Your Comment:
              </label>
              <textarea
                className="form-control"
                id="commentBody"
                name="body"
                value={newComment.body}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Comment
            </button>
          </form>

          <br />

          <h3>Other Reviews</h3>
          {user.comments &&
            user.comments
              .slice()
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((comment) => (
                <div key={comment.id} className="card mb-2">
                  <div className="card-body">
                    <p className="card-text">{comment.body}</p>
                    <p className="card-text text-muted">
                      Comment by {comment.name} on {comment.timestamp}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

export default CommentSection
