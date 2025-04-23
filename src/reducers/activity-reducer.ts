import { Activity } from "../types"

export type ActivityActions =
    /**
     * Las acciones tiene un tipo y un payload
     * type: es la descripción de la acción
     * payload: es el objeto (información) que modifica o agrega al state
     */
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } | 
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'reset-activity' }

// Define the state type
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// Reducer function to handle actions and update state
export const activityReducer = (
    state: ActivityState = initialState, // Default state
    action: ActivityActions // Action to process
) => {
    if (action.type === 'save-activity') {

        let updatedActivities: Activity[] = []

        if (state.activeId) {
            updatedActivities = state.activities.map(
                activity => activity.id === state.activeId
                    ? action.payload.newActivity // Update the activity if the ID matches
                    : activity // Otherwise, keep the existing activity
            )
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity] // Add new activity to the state
        }
        return {
            ...state,
            activities: updatedActivities, // Update the activities in the state
            activeId: ''
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id // Set the active ID in the state
        }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'reset-activity') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}
