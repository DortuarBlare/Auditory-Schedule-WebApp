import { Meteor } from 'meteor/meteor';
import { ScheduleCollection } from '../imports/api/allCollections';
import { AuditoryCollection } from '../imports/api/allCollections';
import { GroupCollection } from '../imports/api/allCollections';

Meteor.startup(() => {
    if (Meteor.isServer)
        console.log("Server", process.env.MONGO_URL)

    ScheduleCollection.find().count()
    AuditoryCollection.find().count()
    GroupCollection.find().count()

    //ScheduleCollection.createIndex({ week: 1, day: 1, time: 1, auditory: 1 }, { unique: true })

    //AuditoryCollection.createIndex({ name: 1 }, { unique: true })

    //GroupCollection.createIndex({ name: 1 }, { unique: true })
});