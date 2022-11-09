import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])


    const deleteButtonClick = (id) => {
        deleteEvent(id)
        window.location.reload()
    }

    const leaveButton = eventId => {
        leaveEvent(eventId).then(getEvents().then(data => setEvents(data)).then(window.location.reload()))
    }
      
    const joinButton = eventId => {
        joinEvent(eventId).then(getEvents().then(data => setEvents(data)).then(window.location.reload()))
    }

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            navigate({ pathname: "/events/new" })
        }}>Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date"> Event date: {event.date} at {event.time}</div>
                        <div className="event__organizer">Event set up by {event.organizer}</div>
                        {
                            event.joined 
                            ? <button onClick={()=>leaveButton(event.id)}>Leave Event</button>
                            : <button onClick={()=>joinButton(event.id)}>Join Event</button>
                        }
                        <button onClick={()=>navigate(({ pathname: `/events/${event.id}`}))}>Edit Event</button>
                        <button onClick={()=> deleteButtonClick(event.id)}>Delete Event</button>
                    </section>
                })
            }
        </article>
        </>
    )
}