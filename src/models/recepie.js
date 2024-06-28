import { Schema, model, models } from 'mongoose';

const recepieSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  steps: {
    type: [String],
    required: true
  },
  createdAt: {
    type: String,
    default: () => {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // Use 12-hour format with AM/PM
      };
      return now.toLocaleDateString('en-US', options);
    }
  },
  likes: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true
  }
});


let Recepie;

try {
  // Try to retrieve existing model to avoid OverwriteModelError
  Recepie = models.recipes || model('recepies', recepieSchema);
} catch (error) {
  // If model retrieval fails (likely due to initial load), define new model
  Recepie = model('recepies', recepieSchema);
}

export default Recepie;
