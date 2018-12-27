// File: modules/user.js

import { getImages } from '../service/api'
import { createFetch } from './fetch'
const STORE_PATH = 'images'
// Action creators
export function load(id) {
    return createFetch(STORE_PATH, getImages, id);
}
// Selectors
export function selectImages(state) {
    return state[STORE_PATH].data;
}
export function selectFetching(state) {
    return state[STORE_PATH].fetching;
}
export function selectError(state) {
    return state[STORE_PATH].error;
}
export function selectUsername(state) {
    return selectUser(state).username;
}