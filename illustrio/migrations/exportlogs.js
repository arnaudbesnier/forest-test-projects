db.exportlogs.find().forEach(function (log){
    var user = db.users.findOne({ _id: log.user }, {email:1, roles:1});
    if (user.roles.admin) {
        db.exportlogs.remove({_id: log._id});
    }
})

db.exportlogs.find().forEach(function (log){
    var illu = db.illustrations.findOne({ _id: log.illustration._id }, {name:1});
    db.exportlogs.update({_id: log._id }, { $set: { 'illustration.name': illu.name } }, false, false);
})

db.searchlogs.find().forEach(function (log){
    var user = db.users.findOne({ _id: log.user }, {email:1, roles:1});
    if (user.roles.admin) {
        db.searchlogs.remove({_id: log._id});
    }
})
db.searchlogs.remove({query: {$exists: false}})
