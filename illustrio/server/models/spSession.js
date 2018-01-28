var mongoose = require('mongoose');
var SpSessionSchema = mongoose.Schema({
    hello: String,
    room_fields: {
        audio: {
            mixed: {
                created: {
                    type: Date
                },
                s3: {
                    key: {
                        type: String
                    },
                    url: {
                        type: String
                    },
                    urlExpiration: {
                        type: Date
                    }
                }
            }
        }
    }
});
module.exports = mongoose.model('SpSession', SpSessionSchema);
