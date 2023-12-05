import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import InviteForm from './Components/inviteform'
import Navigation from './Components/navigation'
import ProjectEditForm from './Components/projecteditform'
import CommentSection from './Components/reviewsection'
import About from './Routes/about'
import CreateProject from './Routes/create-project'
import Project from './Routes/project'

test('renders create project form correctly', () => {
  // Arrange
  const { getByLabelText, getByText } = render(<CreateProject />)

  // Act

  // Assert
  expect(getByLabelText(/Name/i)).toBeInTheDocument()
  expect(getByLabelText(/Description/i)).toBeInTheDocument()
  expect(getByLabelText(/Type/i)).toBeInTheDocument()
  expect(getByText(/Save/i)).toBeInTheDocument()
})

test('ensures text inputs are required fields', () => {
  // Arrange
  const { getByLabelText, getByText, queryByText } = render(<CreateProject />)
  const saveButton = getByText(/Save/i)

  // Acts
  fireEvent.click(saveButton)

  // Assert
  expect(getByText(/Name is required/i)).toBeInTheDocument()
  expect(getByText(/Description is required/i)).toBeInTheDocument()
})

test('accordion opens and closes properly', () => {
  // Arrange
  const handleCommentSubmit = jest.fn()
  const handleInputChange = jest.fn()
  const newComment = { name: '', body: '' }
  const user = { comments: [] }

  render(
    <CommentSection
      newComment={newComment}
      handleCommentSubmit={handleCommentSubmit}
      handleInputChange={handleInputChange}
      user={user}
    />,
  )

  // Act
  const accordionTrigger = screen.getByText('Submit a Review')
  fireEvent.click(accordionTrigger)

  // Assert
  const commentForm = screen.getByLabelText('Your Comment:')
  expect(commentForm).toBeInTheDocument()

  // Act
  fireEvent.click(accordionTrigger)

  // Assert
  expect(commentForm).not.toBeInTheDocument()
})

test('updates projectName state on input change', () => {
  // Arrange
  const setProjectNameMock = jest.fn()
  render(
    <ProjectEditForm
      projectName="InitialName"
      setProjectName={setProjectNameMock}
    />,
  )

  // Act
  const nameInput = screen.getByLabelText('Name')
  fireEvent.change(nameInput, { target: { value: 'NewName' } })

  // Assert
  expect(setProjectNameMock).toHaveBeenCalledWith('NewName')
})

test('updates projectDescription state on textarea change', () => {
  // Arrange
  const setProjectDescriptionMock = jest.fn()
  render(
    <ProjectEditForm
      projectDescription="InitialDescription"
      setProjectDescription={setProjectDescriptionMock}
    />,
  )

  // Act
  const descriptionTextarea = screen.getByLabelText('Description')
  fireEvent.change(descriptionTextarea, { target: { value: 'NewDescription' } })

  // Assert
  expect(setProjectDescriptionMock).toHaveBeenCalledWith('NewDescription')
})

test('ProjectEditForm renders correctly', () => {
  // Arrange
  const { getByLabelText, getByText } = render(<ProjectEditForm />)

  // Act & Assert
  expect(getByText('Edit Project Details')).toBeInTheDocument()
  expect(getByLabelText('Name')).toBeInTheDocument()
  expect(getByLabelText('Description')).toBeInTheDocument()
  expect(getByLabelText('Type')).toBeInTheDocument()
  expect(getByLabelText('Status')).toBeInTheDocument()
  expect(getByText('Save')).toBeInTheDocument()
})

test('Updating Name input field updates projectName state variable', () => {
  // Arrange
  const { getByLabelText } = render(<CreateProject />)
  const projectNameInput = getByLabelText('Name')

  // Act
  fireEvent.change(projectNameInput, { target: { value: 'Test Project' } })

  // Assert
  expect(projectNameInput.value).toBe('Test Project')
})

test('Updating Description textarea updates projectDescription state variable', () => {
  // Arrange
  const { getByLabelText } = render(<CreateProject />)
  const projectDescriptionTextarea = getByLabelText('Description')

  // Act
  fireEvent.change(projectDescriptionTextarea, {
    target: { value: 'Test Description' },
  })

  // Assert
  expect(projectDescriptionTextarea.value).toBe('Test Description')
})

test('Shows "edit project details" when isEditing is true', () => {
  // Arrange
  const { getByText } = render(<ProjectEditForm isEditing={true} />)

  // Act & Assert
  const editProjectDetailsText = getByText('Edit Project Details')
  expect(editProjectDetailsText).toBeInTheDocument()
})

test('Accordion toggles open and close', () => {
  // Arrange
  const { getByText } = render(<About />)

  // Act
  const accordionTrigger = getByText('What is our mission?')
  fireEvent.click(accordionTrigger)

  // Assert
  expect(
    getByText(
      'To help early stage startup founders source users for product validation and other forms of product-related research.',
    ),
  ).toBeInTheDocument()

  // Act
  fireEvent.click(accordionTrigger)

  // Assert
  expect(() =>
    getByText('We make money by taking a cut of each transaciton on the site.'),
  ).toThrow()
})
