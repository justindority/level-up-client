import { createEvent, getEvent, updateEvent } from "../../managers/EventManager.js"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGames, getGameTypes } from '../../managers/GameManager.js'


export const UpdateEventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const {eventId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
        getGames().then(data => setGames(data))
        getEvent(eventId).then(data => setCurrentEvent(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        let stateEvent = Object.assign({}, currentEvent)
        stateEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(stateEvent)
    }

    return (
        <form className="eventForm">
        <h2 className="eventForm_Title">Update Existing Event</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="game">Game: </label>
                <select type="text" name="gameId" required autoFocus className="form-control"
                    value={parseInt(currentEvent.game)}
                    onChange={changeEventState}>
                        <option value={0}>Select a Game</option>
                        {
                            games.map(g => {
                                return <option value={g.id}>{g.title}</option>
                            })
                        }
                    </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" required className="form-control"
                    value={currentEvent.description}
                    onChange={changeEventState}
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date: </label>
                <input type="date" name="date" required className="form-control"
                    value={currentEvent.date}
                    onChange={changeEventState}
                />
            </div>
            <div className="form-group">
                <label htmlFor="time">Time: </label>
                <input type="time" name="time" required className="form-control"
                    value={currentEvent.time}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>

        {/* TODO: create the rest of the input fields */}

        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const event = {
                    id: parseInt(currentEvent.id),
                    game: parseInt(currentEvent.game),
                    description: currentEvent.description,
                    date: currentEvent.date,
                    time: currentEvent.time,
                    organizer: parseInt(currentEvent.organizer)
                }

                // Send POST request to your API
                updateEvent(event)
                    .then(() => navigate("/events"))
            }}
            className="btn btn-primary">Update</button>
    </form>
    )
}