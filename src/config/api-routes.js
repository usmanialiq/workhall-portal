const host = process.env.NODE_ENV === "production" 
    ? "https://workhall.co/api" : "http://localhost:3000/api";

export const login = `${host}/auth/login`;
export const register = `${host}/auth/register`;
export const users = `${host}/users`;
export const locations = `${host}/locations`;
export const inventory = `${host}/inventory`;
export const bookings = `${host}/bookings`;