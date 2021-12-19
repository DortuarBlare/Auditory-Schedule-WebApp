import { Mongo } from 'meteor/mongo'
import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { ScheduleCollection, AuditoryCollection, GroupCollection, Schedule } from '../../api/allCollections'
import { ScheduleForm } from './ScheduleForm'
import { Property } from '../Property'
import './ScheduleCard.css'


interface Props {
    schedule: Schedule
}

export const ScheduleCard: React.FC<Props> = ({ schedule }) => {
    const auditoriesFromDB = useTracker(() => AuditoryCollection.find({}).fetch())
    const groupsFromDB = useTracker(() => GroupCollection.find({}).fetch())

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newSchedule: Schedule) => {
        ScheduleCollection.update(schedule._id ?? new Mongo.ObjectID(''), newSchedule)
        setIsEdit(false)
    }

    const onDelete = () => {
        ScheduleCollection.remove(schedule._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <ScheduleForm schedule={schedule} onSubmit={onEdit} />
                :
                <div className="schedule-card-main">

                    <Property title="Аудитория:" value={auditoriesFromDB.find(aud => aud._id?.equals(schedule.auditory._id))?.name} />
                    <Property title="Группа:" value={groupsFromDB.find(gr => gr._id?.equals(schedule.group._id))?.name} />
                    <Property title="Неделя:" value={schedule.week} />
                    <Property title="День недели:" value={schedule.day} />
                    <Property title="Время:" value={schedule.time} />
                </div>
            }
            <div className="schedule-card-controls">
                <button className="button buttonDarkBlue" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button buttonRed" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}