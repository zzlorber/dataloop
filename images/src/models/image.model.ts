import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
import Image from '../interfaces/image.interface';

const imageSchema = new mongoose.Schema({
  id: { type: String, default: uuid.v4 },
  value: String,
  filename: String
});

const imageModel = mongoose.model<Image & mongoose.Document>('image', imageSchema);

export default imageModel;