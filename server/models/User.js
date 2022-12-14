const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        role: {
            type: String,
            enum : ['user','admin'],
            default: 'user'
        },
        desc: {
            type: String,
            max: 50,
        },
        age: {
            type: String,
            max: 50,
        },
        city: {
            type: String,
            max: 50,
        },
        linkToSocial: {
            type: String,
            max: 50,
        },
        country: {
            type: String,
            max: 50,
            required: true,
        },
        from: {
            type: String,
            max: 50,
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);