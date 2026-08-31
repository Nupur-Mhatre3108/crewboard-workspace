import React, { createContext, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * Workspace Context for global workspace metadata
 */
export const WorkspaceContext = createContext(null);

/**
 * Workspace Provider Component
 * Internally persists workspace metadata via useLocalStorage
 */
export function WorkspaceProvider({ children }) {
  const [workspaceName, setWorkspaceName] = useLocalStorage(
    'crewboard_workspace_name',
    'CrewBoard Workspace'
  );

  const [workspaceDescription, setWorkspaceDescription] = useLocalStorage(
    'crewboard_workspace_desc',
    'Collaborative Kanban workspace for college project teams.'
  );

  const updateWorkspaceName = useCallback((newName) => {
    setWorkspaceName(newName.trim() || 'CrewBoard Workspace');
  }, [setWorkspaceName]);

  const updateWorkspaceDescription = useCallback((newDesc) => {
    setWorkspaceDescription(
      newDesc.trim() || 'Collaborative Kanban workspace for college project teams.'
    );
  }, [setWorkspaceDescription]);

  const value = {
    workspaceName,
    workspaceDescription,
    updateWorkspaceName,
    updateWorkspaceDescription,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

/**
 * Custom hook to consume WorkspaceContext easily
 */
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

export default WorkspaceContext;
