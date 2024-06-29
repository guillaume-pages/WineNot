import { useContext } from "react"

import { BottleContext } from "@/app/context/BottleContext"

import { Button } from "@/components/ui/button"

export const Reset = () => {
  const { resetBottleData } = useContext(BottleContext)

  return (
    <div className="flex flex-col">
      <Button variant="ghost" onClick={resetBottleData}>Réinitialiser les champs</Button>
    </div>
  )
}
