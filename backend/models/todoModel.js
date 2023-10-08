import mongoose from "mongoose";

const listSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const List = mongoose.model('list', listSchema)
