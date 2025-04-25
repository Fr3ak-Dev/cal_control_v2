import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export default function CalorieTracker() {

    const { caloriesConsumed, caloriesBurned, caloriesDifference } = useActivity()

    return (
        <>
            <h2 className="text-4xl font-bold text-white text-center">Resumen de Calorías</h2>
            <div className="flex flex-col items-center md:flex-row justify-between gap-5 mt-10">
                <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
                <CalorieDisplay calories={caloriesBurned} text="Ejercicio" />
                <CalorieDisplay calories={caloriesDifference} text="Diferencia" />
            </div>
        </>
    )
}
