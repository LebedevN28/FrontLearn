import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import type { NoteType } from '../model/types';
import { ZodError } from 'zod';
import { noteSchema } from '../model/schema';

class NoteService {
  constructor(private readonly client: AxiosInstance) {}

  async getNotes(): Promise<NoteType[]> {
    try {
      const response = await this.client('/notes');
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = noteSchema.array().parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async createNote(formData: FormData): Promise<NoteType> {
    try {
      const response = await this.client.post('/notes', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 201) throw new Error('Неверный статус, ожидалось 201');
      const data = noteSchema.parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async editNote(id: NoteType['id'], formData: FormData): Promise<NoteType> {
    try {
      const response = await this.client.put(`/notes/${id}`, Object.fromEntries(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = noteSchema.parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async deleteById(noteId: NoteType['id']): Promise<void> {
    try {
      const response = await this.client.delete(`/notes/${noteId}`);
      if (response.status !== 204) throw new Error('Неверный статус, ожидалось 204');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }
}

const noteService = new NoteService(axiosInstance);

export default noteService;
