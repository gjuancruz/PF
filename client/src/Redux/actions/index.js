// import axios from 'axios';

export const FILTER_TYPE = 'FILTER_TYPE';
export const FILTER_GENRE = 'FILTER_GENRE';

export function filterByType (payload) {
    return {
        type: FILTER_TYPE,
        payload
    }
}

export function filterByGenre ( payload ) {
    return {
        type: FILTER_GENRE,
        payload
    }
}