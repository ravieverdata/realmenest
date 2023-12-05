// axiosUtility.ts
import axios from 'axios';
import { Request } from 'express';

export const sendRequestPost = async (
  url: string,
  data: any,
  request: Request,
  ip: string
): Promise<any> => {

  const microhost = request['microhost'];

  try {
    const headers = {
      Authorization: `Bearer ${request['accesstoken']}`,
      'X-User-IP': ip,
    };

    const response = await axios.post(`${microhost}${url}`, data, {headers});
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      console.error(error.message);
      throw { message: 'An error occurred while communicating with the server.' };
    }
  }
};



export const sendRequestGet = async (
    url: string,
    request: Request,
    ip: string
  ): Promise<any> => {
      
    const microhost = request['microhost'];

    console.log('hdh', microhost);
  
    try {
      const headers = {
        Authorization: `Bearer ${request['accesstoken']}`,
        'X-User-IP': ip,
      };
  
      const response = await axios.get(`${microhost}${url}`, {headers});
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        console.error(error.message);
        throw { message: 'An error occurred while communicating with the server.' };
      }
    }
};
