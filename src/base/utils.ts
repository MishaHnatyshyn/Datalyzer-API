import {Like, Raw} from 'typeorm';

export const searchQuery = (value = '') => Like(`%${value}%`);
