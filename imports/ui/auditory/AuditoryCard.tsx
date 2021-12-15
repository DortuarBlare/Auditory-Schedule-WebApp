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
        <div className="auditory-card">
            {isEdit ?
                <AuditoryForm auditory={auditory} onSubmit={onEdit} />
                :
                <div className="auditory-card__main">
                    <Property title="Аудитория:" value={auditory.name} />
                </div>
            }
            <div className="auditory-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? 'Удалить' : 'Редактировать'}
                </button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}