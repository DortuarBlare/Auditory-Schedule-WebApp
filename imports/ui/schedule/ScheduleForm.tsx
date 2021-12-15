import { Mongo } from 'meteor/mongo'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState } from 'react'
import { GroupCollection, AuditoryCollection, Schedule } from '../../api/allCollections'
import { Property } from '../Property'

interface Props {
    schedule?: Schedule
    onSubmit: (schedule: Schedule) => void
}

export const ScheduleForm: React.FC<Props> = ({ schedule, onSubmit }) => {
    const auditoriesFromDB = useTracker(() => AuditoryCollection.find({}).fetch())
    const groupsFromDB = useTracker(() => GroupCollection.find({}).fetch())

    const [week, setWeek] = useState(schedule?.week ?? 0)
    const [day, setDay] = useState(schedule?.day ?? '')
    const [time, setTime] = useState(schedule?.time ?? '')
    const [auditory, setAuditory] = useState(schedule?.auditory._id.toHexString() ?? '');
    const [group, setGroup] = useState(schedule?.group._id.toHexString() ?? '');

    const onClick = () => {
        if (week == 0 || day === '' || time === '' || auditory === '' || group === '') return
        onSubmit({
            week,
            day,
            time,
            auditory: { _id: new Mongo.ObjectID(auditory) },
            group: { _id: new Mongo.ObjectID(group) }
        })
        setWeek(0)
        setDay('')
        setTime('')
        setAuditory('')
        setGroup('')
    }

    return (
        <div className="schedule-form">
            <Property title="Аудитория:" value={
                <select defaultValue="default-auditory" onChange={e => setAuditory(e.target.value)}>
                    <option disabled value="default-auditory">Выберите аудиторию</option>
                    {
                        auditoriesFromDB.map(
                            aud =>
                                <option key={aud._id?.toHexString()} value={aud._id?.toHexString()}>
                                    {aud.name}
                                </option>
                        )
                    }
                </select>
            } />

            <Property title="Группа:" value={
                <select defaultValue="default-group" onChange={e => setGroup(e.target.value)}>
                    <option disabled value="default-group">Выберите группу</option>
                    {
                        groupsFromDB.map(
                            gr =>
                                <option key={gr._id?.toHexString()} value={gr._id?.toHexString()}>
                                    {gr.name}
                                </option>)
                    }
                </select>
            } />

            <Property title="Неделя:" value={
                <select defaultValue="default-week" onChange={e => setWeek(Number.parseInt(e.target.value))}>
                    <option disabled value="default-week">Выберите неделю</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                </select>
            } />

            <Property title="День недели:" value={
                <select defaultValue="default-day" onChange={e => setDay(e.target.value)}>
                    <option disabled value= "default-day">Выберите день недели</option>
                    <option>Понедельник</option>
                    <option>Вторник</option>
                    <option>Среда</option>
                    <option>Четверг</option>
                    <option>Пятница</option>
                    <option>Суббота</option>
                    <option>Воскресенье</option>
                </select>
            } />

            <Property title="Время:" value={
                <select defaultValue="default-time" onChange={e => setTime(e.target.value)}>
                    <option disabled value= "default-time">Выберите время</option>
                    <option value= "8:30 - 10:00">8:30 - 10:00</option>
                    <option value="10:15 - 11:45">10:15 - 11:45</option>
                    <option value="12:00 - 13:30">12:00 - 13:30</option>
                    <option value="14:00 - 15:30">14:00 - 15:30</option>
                    <option value="15:45 - 17:15">15:45 - 17:15</option>
                    <option value="17:30 - 19:00">17:30 - 19:00</option>
                    <option value="19:15 - 20:45">19:15 - 20:45</option>
                </select>
            } />

            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}