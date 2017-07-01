export const SET = 'SET' //checked ac

export default {
    state: JSON.parse(localStorage.getItem('data')) || {},
    mutations: {
        [SET](state, data) {
            Object.assign(state, data)
            localStorage.setItem('data', JSON.stringify(state))

        },
    },
    actions: {
        [SET]({commit}, data) {
            commit(SET, data)
        },
    }
}