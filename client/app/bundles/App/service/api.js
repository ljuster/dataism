// File: service/api.js

export function getUser(id) {
    return fetch(`/api/users/${id}`)
}
export function getImages() {
    return fetch(`/images`)
}