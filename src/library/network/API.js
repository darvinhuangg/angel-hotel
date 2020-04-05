// apiUtils.js
import axios from 'axios';
import {handleError} from './handleErrors';

export const SERVER_DOMAIN = 'http://hotel.stickyturbo.com';
const api = SERVER_DOMAIN + '/api/v1/';

const getHeaders = () => {

  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
};
// HTTP GET Request - Returns Resolved or Rejected Promise

export const get = (path: string) => {
  return new Promise((resolve, reject) => {
    axios.get(`${api}${path}`, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};

// HTTP PATCH Request - Returns Resolved or Rejected Promise
export const patch = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    axios.patch(`${api}${path}`, data, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};
// HTTP POST Request - Returns Resolved or Rejected Promise

export const post = (path: string, data:any) => {
  return new Promise((resolve, reject) => {
    axios.post(`${api}${path}`, data, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error.response)) });
  });
};

// HTTP DELETE Request - Returns Resolved or Rejected Promise
export const del = (path: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${api}${path}`, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};