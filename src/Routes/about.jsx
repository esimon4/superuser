import React, { useState } from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

const About = () => {
  useEffect(() => {
    document.title = 'About'
  }, [])

  const AccordionItem = ({ title, content }) => {
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
          <h3 style={{ margin: 0 }}>{title}</h3>
          {renderTriggerIcon(isAccordionOpen)}
        </div>
        {isAccordionOpen && (
          <div>
            <p>{content}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>About Us</h2>

      <p>
        Startup founders always hear the importance of user research to their
        product's success. Very rarely, however, do they hear how to find the
        right users for that research. SuperUser is a two-sided marketplace
        where founders can find users for different types of research projects
        related to their product. As a founder, you can create a research
        project and browse and invite everyday people to participate in your
        project.
      </p>

      <AccordionItem
        title="What is our mission?"
        content="To help early stage startup founders source users for product validation and other forms of product-related research."
      />

      <AccordionItem
        title="How do we make money?"
        content="We make money by taking a cut of each transaciton on the site."
      />
    </div>
  )
}

export default About
