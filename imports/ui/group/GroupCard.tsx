import { Mongo } from 'meteor/mongo'
import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Group, GroupCollection, ScheduleCollection } from '../../api/allCollections'
import { Property } from '../Property'
import { GroupForm } from './GroupForm'


interface Props {
    group: Group
}

export const GroupCard: React.FC<Props> = ({ group }) => {
    const schedulesFromDB = useTracker(() => ScheduleCollection.find({}).fetch())

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newGroup: Group) => {
        GroupCollection.update(group._id ?? new Mongo.ObjectID(''), newGroup)
        setIsEdit(false)
    }

    const onDelete = () => {
        schedulesFromDB.forEach(gr => {
            if (gr.group._id.equals(group._id ?? new Mongo.ObjectID('')))
                ScheduleCollection.remove(gr._id ?? new Mongo.ObjectID(''));
        })

        GroupCollection.remove(group._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <GroupForm group={group} onSubmit={onEdit} />
                :
                <div className="schedule-card-main">
                        <Property title="Группа:" value={group.name} />
                    </div>
            }
            <div className="schedule-card-controls">
                <button className="button buttonDarkBlue" onClick={() => setIsEdit(!isEdit)}>
                    {isEdit ? 'Удалить' : 'Редактировать'}
                </button>
                <button className="button buttonRed" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}