import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    caloriesDifference: number
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    // Counters
    const caloriesConsumed = useMemo(() => state.activities.reduce(
        (total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities]
    )
    const caloriesBurned = useMemo(() => state.activities.reduce(
        (total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities]
    )
    const caloriesDifference = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities]
    )

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            caloriesDifference
        }}>
            {children}
        </ActivityContext.Provider>
    )
}