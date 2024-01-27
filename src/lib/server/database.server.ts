import mongoose, { Model } from 'mongoose';

import { SECRET_MONGODB_CONNECTION_STRING } from '$env/static/private';

import { JournalSchema } from './schema';
import type { IJournalModel, JournalModelType } from '../../types';

class JournalDatabase {
  private _connection: typeof mongoose | null = null;
  private _isConnected: boolean = false;
  public model: Model<IJournalModel> | undefined;

  constructor() {}

  public async connect() {
    try {
      this._connection = await mongoose.connect(SECRET_MONGODB_CONNECTION_STRING);
      this.model = this._connection.model('journal-entry', JournalSchema);
      this._isConnected = true;
      console.info('Database connected');
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message);
    }
  }

  public async findAll() {
    if (!this._isConnected) {
      throw new Error('Database not connected!');
    }
    return await this.model?.find({});
  }
  public async findByPlaceId(id: string) {
    if (!this._isConnected) {
      throw new Error('Database not connected!');
    }
    return await this.model?.findOne({
      place_id: id,
    });
  }
  public async create(obj: JournalModelType) {
    if (!this._isConnected) {
      throw new Error('Database not connected!');
    }
    if (!obj || Object.keys(obj).length === 0) {
      throw new Error('Payload is not present');
    }
    if (!obj.latlng) {
      throw new Error('latlng property is required in the payload');
    }
    await this.model?.create({
      ...obj,
      createdAt: (new Date()).toISOString(),
    });
  }
  public async update(id: string, updatedPayload: Partial<JournalModelType>) {
    if (!this._isConnected) {
      throw new Error('Database not connected!');
    }
    if (!id) {
      throw new Error('id is required');
    }
    if (!updatedPayload) {
      throw new Error('Payload is not present');
    }
    await this.model?.findOneAndUpdate({
      _id: id,
    }, {
      $set: {
        ...updatedPayload,
        updatedAt: (new Date()).toISOString(),
      }
    });
  }
}

const journalDatabase = new JournalDatabase();
await journalDatabase.connect();

export { journalDatabase };
