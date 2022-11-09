import { getByTitle } from "@testing-library/react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGame, getGameTypes, updateGame } from '../../managers/GameManager.js'
import { getGamers } from "../../managers/GamerManager.js"



export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
        getGame(gameId).then(data => setCurrentGame(data))
    }, [])

    const changeGameState = (domEvent) => {
        let stateGame = Object.assign({}, currentGame)
        stateGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(stateGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level From 1 (easiest) to 10 (hardest): </label>
                    <input type="text" name="skill_level" required className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <select type="text" name="game_type" required autoFocus className="form-control"
                        value={parseInt(currentGame.game_type)}
                        onChange={changeGameState}>
                        <option value={0}>Select a Game Type</option>

                    {
                        gameTypes.map(gt => {
                            return (
                                    <option value={gt.id}>{gt.label}</option>
                            )
                        })
                    }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: parseInt(gameId),
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type),
                        gamer: parseInt(currentGame.gamer)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}