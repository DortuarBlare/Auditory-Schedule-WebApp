import { Mongo } from 'meteor/mongo'
import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { ScheduleCollection, AuditoryCollection, GroupCollection, Schedule } from '../../api/allCollections'
import { ScheduleForm } from './ScheduleForm'
import { Property } from '../Property'


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
        <div className="schedule-card">
            {isEdit ?
                <ScheduleForm schedule={schedule} onSubmit={onEdit} />
                :
                <div className="schedule-card__main">

                    <Property title="Аудитория:" value={auditoriesFromDB.find(aud => aud._id?.equals(schedule.auditory._id))?.name} />
                    <Property title="Группа:" value={groupsFromDB.find(gr => gr._id?.equals(schedule.group._id))?.name} />
                    <Property title="Недели:" value={schedule.week} />
                    <Property title="День недели:" value={schedule.day} />
                    <Property title="Время:" value={schedule.time} />
                </div>
            }
            <div className="schedule-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}