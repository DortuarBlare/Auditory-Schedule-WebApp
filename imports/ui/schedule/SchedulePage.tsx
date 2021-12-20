import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { ScheduleCollection, Schedule } from '../../api/allCollections'
import { ScheduleCard } from './ScheduleCard';
import { ScheduleForm } from './ScheduleForm';
import { ScheduleFindForm } from './ScheduleFindForm';
import { ScheduleFind2Form } from './ScheduleFind2Form';
import './SchedulePage.css'

export const SchedulePage: React.FC = () => {
    const [search, setSearch] = useState<{ [key: string]: any }>({})

    const schedules = useTracker(() =>
        ScheduleCollection.find(search, { sort: { auditory: 1 } }).fetch()
    )

    const [findFormShow, setFindFormShow] = useState(false)
    const [find2FormShow, setFind2FormShow] = useState(false)
    const [addFormShow, setAddFormShow] = useState(false)

    const onFindSubmit = (time: string) => {
        setSearch(finding => ({ ...finding, time: new RegExp(`${time}`) }))
    }

    const onFind2Submit = (week: number) => {
        if (week == 0) 
            setSearch(finding => ({ ...finding, week: { $gte: 1, $lte: 18 } }))
        else setSearch(finding2 => ({ ...finding2, week: week }))
    }

    const onAddSubmit = (schedule: Schedule) => {
        ScheduleCollection.insert(schedule)
        setAddFormShow(false)
    }

    return (
        <div className="schedule-page">
            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => {
                    if (findFormShow) onFindSubmit('')
                    setFindFormShow(!findFormShow);
                }}>
                    {`${findFormShow ? 'Закрыть' : 'Поиск в заданные часы'}`}
                </button>
                {findFormShow && <ScheduleFindForm onSubmit={onFindSubmit} />}
            </div>

            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => {
                    if (find2FormShow) onFind2Submit(0)
                    setFind2FormShow(!find2FormShow);
                }}>
                    {`${find2FormShow ? 'Закрыть' : 'Поиск на заданное число часов в указанную неделю'}`}
                </button>
                {find2FormShow && <ScheduleFind2Form onSubmit={onFind2Submit} />}
            </div>

            <div className="card schedule-form">
                <button className="button buttonDarkBlue" onClick={() => setAddFormShow(!addFormShow)}>
                    {`${addFormShow ? 'Закрыть' : 'Добавить'}`}
                </button>
                {addFormShow && <ScheduleForm onSubmit={onAddSubmit} />}
            </div>

            <div>
                {schedules.map(schedule => <ScheduleCard key={schedule._id?.toHexString()} schedule={schedule} />)}
            </div>
        </div>
    )
}