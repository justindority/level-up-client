import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date"> Event date: {event.date} at {event.time}</div>
                        <div className="event__organizer">Event set up by {event.organizer}</div>
                    </section>
                })
            }
        </article>
    )
}