const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: false,
    },
    created_at: {
       type: Date, default: Date.now
       },

    user: {
       type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
      } // Reference to the user
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Task', taskSchema);