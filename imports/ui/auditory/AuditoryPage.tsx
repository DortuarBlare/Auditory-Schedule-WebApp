import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Auditory, AuditoryCollection } from '../../api/allCollections';
import { AuditoryCard } from './AuditoryCard';
import { AuditoryForm } from './AuditoryForm';

export const AuditoryPage: React.FC = () => {
    const auditories = useTracker(() => AuditoryCollection.find({}, { sort: { name: 1 } }).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (auditory: Auditory) => {
        AuditoryCollection.insert(auditory), { unique: true }
        setAddFormShow(false)
    }

    return (
        <div className = "auditory-page">
            <div className = "card">
                <button className = "button" onClick = {() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Закрыть' : 'Добавить'}`}
                </button>
                {addFormShow &&
                    <AuditoryForm onSubmit = {onAddSubmit} />
                }
            </div>
            <div>
                {auditories.map(a => <AuditoryCard key = {a._id?.toHexString()} auditory = {a} />)}
            </div>
        </div>
    )
}