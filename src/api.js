const apiUrl = 'http://localhost:3001';

export async function addInvite(data) {
  const { projectId, userId } = data;

  try {
    const response = await fetch(`${apiUrl}/projects/${projectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project data');
    }

    const projectData = await response.json();
    const existingParticipants = projectData.participants || [];

    if (!existingParticipants.includes(userId)) {
      const updatedParticipants = [...existingParticipants, userId];
      const updatedData = { ...projectData, participants: updatedParticipants };

      const updateResponse = await fetch(`${apiUrl}/projects/${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (updateResponse.ok) {
        return updateResponse.json();
      } else {
        throw new Error(`Error: ${updateResponse.statusText}`);
      }
    } else {
      throw new Error('Error: User is already invited.');
    }
  } catch (error) {
    console.error('Error adding invite:', error);
    throw error;
  }
}

export async function editProject(data) {
  const { projectId, projectName, projectDescription, projectType, projectStatus } = data;

  try {
    const response = await fetch(`${apiUrl}/projects/${projectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch existing project data');
    }

    const existingProjectData = await response.json();
    const updatedData = {
      ...existingProjectData,
      name: projectName,
      description: projectDescription,
      projectType,
      status: projectStatus,
    };

    const updateResponse = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update project');
    }

    return updateResponse.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function createProject(data) {
  const { projectName, projectDescription, projectType, projectStatus, projectParticipants } = data;

  const newProject = {
    name: projectName,
    description: projectDescription,
    projectType,
    status: projectStatus,
    participants: projectParticipants,
  };

  try {
    const response = await fetch(`${apiUrl}/projects`, {
      method: 'POST',
      body: JSON.stringify(newProject),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function deleteProject(projectId) {
  try {
    const response = await fetch(`${apiUrl}/projects/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

export async function createComment(data) {
  const { userId, name, body, timestamp } = data;

  const newComment = {
    userId,
    name,
    body,
    timestamp,
  };

  try {
    const response = await fetch(`${apiUrl}/comments`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

export async function deleteSelectedItems(selectedItems) {
  const deletePromises = selectedItems.map(async (id) => {
    const response = await fetch(`${apiUrl}/users/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Error deleting user with id ${id}: ${response.statusText}`);
    }
  });

  try {
    await Promise.all(deletePromises);
    const usersResponse = await fetch(`${apiUrl}/users`);
    if (!usersResponse.ok) {
      throw new Error(`Error fetching users: ${usersResponse.statusText}`);
    }

    return usersResponse.json();
  } catch (error) {
    console.error('Error deleting selected items:', error);
    throw error;
  }
}
