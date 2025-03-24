import { Schema } from "mongoose";

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true, maxLength: 5, minLength: 500 },
    bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

// NoteSchema.virtual('bug', {
//   localField: 'bugId',
//   foreignField: '_id',
//   ref: 'Bug',
//   justOne: true
// })
