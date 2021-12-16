import React, { useState } from 'react'
import { Group } from '../../api/allCollections'
import { Property } from '../Property'

interface Props {
    group?: Group
    onSubmit: (group: Group) => void
}

export const GroupForm: React.FC<Props> = ({ group, onSubmit }) => {

    const [name, setName] = useState(group?.name ?? '')

    const onClick = () => {
        if (name === '') return
        onSubmit({
            name,
        })
        setName('')
    }

    return (
        <div className="schedule-form">
            <Property title="Группа:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}