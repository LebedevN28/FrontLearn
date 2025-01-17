import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import type { ModuleType } from '../model/module.types';
import { moduleSchema } from '../model/module.schema';
import { ZodError } from 'zod';

class ModuleService {
  constructor(private readonly client: AxiosInstance) {}

  private handleError(error: unknown): never {
    if (error instanceof ZodError) {
      console.error('Zod validation error:', error.issues);
    } else if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }

  async getModules(): Promise<ModuleType[]> {
    try {
      const response = await this.client.get<ModuleType[]>('/modules');
      const data = moduleSchema.array().parse(response.data);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getModuleById(moduleId: number): Promise<ModuleType> {
    try {
      const response = await this.client.get<ModuleType>(`/modules/${moduleId}`);
      return moduleSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

const moduleService = new ModuleService(axiosInstance);
export default moduleService;
