import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Group, GroupCollection } from '../../api/allCollections';
import { GroupCard } from './GroupCard';
import { GroupForm } from './GroupForm';

export const GroupPage: React.FC = () => {
    const groups = useTracker(() => GroupCollection.find({}, { sort: { name: 1 } }).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (group: Group) => {
        GroupCollection.insert(group)
        setAddFormShow(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Закрыть' : 'Добавить'}`}
                </button>
                {addFormShow && <GroupForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {groups.map(g => <GroupCard key={g._id?.toHexString()} group={g} />)}
            </div>
        </div>
    )
}