
const mongoose = require ('mongoose');
const {Schema} = mongoose;
const bcrypt = require ('bcrypt');

const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+..+/, 'Must match an email address!'],
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
    },
    chores:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Chores'
        }
    ],
    groups:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Groups'
        }
    ]

},
{
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  })
  userSchema.methods.isCorrectPassword = async function (password){
    return await bcrypt.compare(password, this.password)
  }
  const User=mongoose.model('User', userSchema)
  module.exports= User
