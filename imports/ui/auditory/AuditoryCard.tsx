import { Mongo } from 'meteor/mongo'
import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Auditory, AuditoryCollection, ScheduleCollection } from '../../api/allCollections'
import { Property } from '../Property'
import { AuditoryForm } from './AuditoryForm'


interface Props {
    auditory: Auditory
}

export const AuditoryCard: React.FC<Props> = ({ auditory }) => {
    const schedulesFromDB = useTracker(() => ScheduleCollection.find({}).fetch())

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newAuditory: Auditory) => {
        AuditoryCollection.update(auditory._id ?? new Mongo.ObjectID(''), newAuditory)
        setIsEdit(false)
    }

    const onDelete = () => {
        schedulesFromDB.forEach(sched => {
            if (sched.auditory._id.equals(auditory._id ?? new Mongo.ObjectID('')))
                ScheduleCollection.remove(sched._id ?? new Mongo.ObjectID(''));
        })

        AuditoryCollection.remove(auditory._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <AuditoryForm auditory={auditory} onSubmit={onEdit} />
                :
                <div className="schedule-card-main">
                    <Property title="Аудитория:" value={auditory.name} />
                </div>
            }
            <div className="schedule-card-controls">
                <button className="button buttonDarkBlue" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button buttonRed" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}