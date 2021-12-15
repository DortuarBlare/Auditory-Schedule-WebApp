import React, { useState } from 'react'
import { Auditory } from '../../api/allCollections'
import { Property } from '../Property'

interface Props {
    auditory?: Auditory
    onSubmit: (auditory: Auditory) => void
}

export const AuditoryForm: React.FC<Props> = ({ auditory, onSubmit }) => {

    const [name, setName] = useState(auditory?.name ?? '')

    const onClick = () => {
        if (name === '') return
        onSubmit({
            name,
        })
        setName('')
    }

    return (
        <div className="auditory-form">
            <Property title="Аудитория:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}