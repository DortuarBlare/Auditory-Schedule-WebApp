import { Mongo } from 'meteor/mongo'
import React, { useState } from 'react'
import { Auditory, AuditoryCollection } from '../../api/allCollections'
import { Property } from '../Property'
import { AuditoryForm } from './AuditoryForm'


interface Props {
    auditory: Auditory
}

export const AuditoryCard: React.FC<Props> = ({ auditory }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newAuditory: Auditory) => {
        AuditoryCollection.update(auditory._id ?? new Mongo.ObjectID(''), newAuditory)
        setIsEdit(false)
    }

    const onDelete = () => {
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