import React, { useState } from 'react'
import { Property } from '../Property'
import './ScheduleForm.css'

interface Props {
    week: number
    numberOfHours: number
    onSubmit: (week: number, numberOfHours: number) => void
}

export const ScheduleFind2Form: React.FC<Props> = ({ week, numberOfHours, onSubmit }) => {
    const [week_, setWeek] = useState(week ?? 0)
    const [numberOfHours_, setNumberOfHours] = useState(numberOfHours ?? 0)

    const onClick = () => {
        console.log("Введенная неделя " + week_)
        console.log("Введенное количество часов " + numberOfHours_)
        onSubmit( week_, numberOfHours_ )
        setNumberOfHours(0)
    }

    return (
        <div className="schedule-form">
            <Property title="Неделя:" value={
                <select defaultValue="default-week" onChange={e => setWeek(Number.parseInt(e.target.value))}>
                    <option disabled value="default-week">Выберите неделю</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                </select>
            } />

            <Property title="Количество часов(1-73):">
                <input type="text" onChange={e => setNumberOfHours(Number.parseInt(e.target.value))} />
            </Property>

            <Property title="Здесь будут умные слова" />

            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}