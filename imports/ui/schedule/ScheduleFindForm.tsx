import React, { useState } from 'react'
import { Property } from '../Property'
import './ScheduleForm.css'

interface Props {
    time: string
    onSubmit: (time: string) => void
}

export const ScheduleFindForm: React.FC<Props> = ({ time, onSubmit }) => {
    const [time_, setTime] = useState(time ?? '')

    const onClick = () => {
        onSubmit(time_)
        setTime(time_)
    }

    return (
        <div className="schedule-form">
            <Property title="Время:" value={
                <select defaultValue="default-time" onChange={e => setTime(e.target.value)}>
                    <option disabled value="default-time">Выберите время</option>
                    <option value="8:30 - 10:00">8:30 - 10:00</option>
                    <option value="10:15 - 11:45">10:15 - 11:45</option>
                    <option value="12:00 - 13:30">12:00 - 13:30</option>
                    <option value="14:00 - 15:30">14:00 - 15:30</option>
                    <option value="15:45 - 17:15">15:45 - 17:15</option>
                    <option value="17:30 - 19:00">17:30 - 19:00</option>
                    <option value="19:15 - 20:45">19:15 - 20:45</option>
                </select>
            } />
            <Property title="Будут выведены аудитории, занятые в заданное время. Остальные аудитории в заданное время свободны"/>

            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}