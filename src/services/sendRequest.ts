const baseURL = 'https://sheetdb.io/api/v1/yy3v79okf45e3';
import axios from 'axios';
const sendRequest = axios.create({
  baseURL,
  timeout: 1000,
});


