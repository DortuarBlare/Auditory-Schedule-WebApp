import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { ScheduleCollection, AuditoryCollection, GroupCollection, Schedule } from '../../api/allCollections'
import { ScheduleCard } from './ScheduleCard';
import { ScheduleForm } from './ScheduleForm';

export const SchedulePage: React.FC = () => {

    const [search, setSearch] = useState<{ [key: string]: any }>({})
    const [searchAuditories, setSearchAuditories] = useState<{ [key: string]: any }>({})
    const [searchGroups, setSearchGroups] = useState<{ [key: string]: any }>({})

    const schedules = useTracker(() =>
        ScheduleCollection.find(search, { sort: { auditory: 1 } }).fetch())

    const auditories = useTracker(() =>
        AuditoryCollection.find(searchAuditories, { sort: { name: 1 } }).fetch())

    const groups = useTracker(() =>
        GroupCollection.find(searchGroups, { sort: { name: 1 } }).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (schedule: Schedule) => {
        ScheduleCollection.insert(schedule)
        setAddFormShow(false)
    }

    return (
        <div className="schedule-page">
            <div className="card">
                <button className="button" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Закрыть' : 'Добавить'}`}</button>
                {addFormShow &&
                    <ScheduleForm onSubmit={onAddSubmit} />
                }
            </div>

            <div>
                {schedules.map(schedule => <ScheduleCard key={schedule._id?.toHexString()} schedule={schedule} />)}
            </div>
        </div>
    )
}