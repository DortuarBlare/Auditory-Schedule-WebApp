import { Mongo } from 'meteor/mongo';
import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { ScheduleCollection, AuditoryCollection } from '../../api/allCollections'
import { Property } from '../Property'
import './ScheduleForm.css'
import '../Property.css'

interface Props {
    week: number
    numberOfHours: number
    onSubmit: (week: number, numberOfHours: number) => void
}

export const ScheduleFind2Form: React.FC<Props> = ({ week, numberOfHours, onSubmit }) => {
    const schedulesFromDB = useTracker(() => ScheduleCollection.find({}).fetch())
    const auditoriesFromDB = useTracker(() => AuditoryCollection.find({}).fetch())

    const [week_, setWeek] = useState(week ?? 0)
    const [numberOfHours_, setNumberOfHours] = useState(numberOfHours ?? 0)

    const onClick = () => {
        onSubmit(week_, numberOfHours_)

        if (document.getElementById("findInfo") != undefined) document.getElementById("findInfo")?.remove()

        var amountOfNecessaryLessons = Math.ceil((numberOfHours_ * 60) / 90)
        var amountOfMaxLessons = 49

        if (week_ >= 1 && week_ <= 18 && numberOfHours_ >= 1 && numberOfHours_ <= 73) {
            var findInfo = document.createElement('findInfo')
            findInfo.id = "findInfo"
            findInfo.className = "property-title"
            findInfo.innerHTML = ""

            auditoriesFromDB.forEach(aud => {
                schedulesFromDB.forEach(sched => {
                    if (sched.auditory._id.equals(aud._id ?? new Mongo.ObjectID('')) && sched.week == week_)
                        amountOfMaxLessons--
                })
                if (amountOfMaxLessons < amountOfNecessaryLessons)
                    findInfo.innerHTML += aud.name + " аудитория не подойдет<br>"
                else
                    findInfo.innerHTML += aud.name + " аудитория подойдет<br>"

                amountOfMaxLessons = 49
            })

            document.getElementById("scheduleFind2Form")?.append(findInfo)
        }
    }

    return (
        <div className="schedule-form" id="scheduleFind2Form">
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

            <Property title="Количество часов(1-73):">
                <input type="text" onChange={e => setNumberOfHours(Number.parseInt(e.target.value))} />
            </Property>

            <Property title="Будут выведены аудитории, занятые в заданную неделю" />

            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}