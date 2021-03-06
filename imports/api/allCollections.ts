import { Mongo } from 'meteor/mongo';

export interface Schedule {
    _id?: Mongo.ObjectID
    week: number
    day: string
    time: string
    auditory: { _id: Mongo.ObjectID }
    group: { _id: Mongo.ObjectID }
}

export const ScheduleCollection = new Mongo.Collection<Schedule>('ScheduleCollection', { idGeneration: 'MONGO' })

export interface Auditory {
    _id?: Mongo.ObjectID
    name: string
}

export const AuditoryCollection = new Mongo.Collection<Auditory>('AuditoryCollection', { idGeneration: 'MONGO' })

export interface Group {
    _id?: Mongo.ObjectID
    name: string
}

export const GroupCollection = new Mongo.Collection<Group>('GroupCollection', { idGeneration: 'MONGO' })