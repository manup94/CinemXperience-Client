import { useEffect, useState } from "react"
import { useParams } from "react-router"
import comboService from "../../services/combos.services"

const ComboDetailsPage = () => {

    const { combo_id } = useParams()

    const [combo, setCombo] = useState({})

    useEffect(() => {
        comboService
            .getOneCombo(combo_id)
            .then(({ data }) => setCombo(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <h1>party ------- {combo.snacks}</h1>
    )
}

export default ComboDetailsPage