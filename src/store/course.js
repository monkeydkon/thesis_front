import axios from 'axios'
import router from '../router'

export default {
    state: {
        classes: JSON.parse(localStorage.getItem('classes')) || []
    },
    getters: {
        selectedClass: (state) => state.selectedClass
    },
    mutations: {
        setClasses(state, classes) {
            state.classes = classes
        },
        setSelectedClass(state, id) {
            if (!id) {
                state.selectedClass = state.classes[0]
            } else {
                state.selectedClass = state.classes.find(c => c.id == id)
            }
        },
    },
    actions: {
        async goToClasses({ commit, state }) {
            const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)
            console.log(res)
            commit('setClasses', res.data)

            localStorage.setItem('classes', JSON.stringify(res.data))
            commit('setSelectedClass')
            console.log('SELECTED CLASS', state.setSelectedClass);
            if (!!state.selectedClass) {
                router.push(`/classes/${state.selectedClass.id}/posts`)
            } else {
                router.push(`/classes`)
            }
        },
        selectClass({ commit, state }, id) {
            commit('setSelectedClass', id)
            router.push(`/classes/${state.selectedClass.id}/posts`)
        },

        async createClass({ dispatch }, credentials) {
            await axios.post(`${process.env.VUE_APP_BASE_URL}/api/courses`, credentials)
            dispatch('goToClasses')

        },

        teacherNewPost({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    const post = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/courses/posts`, credentials)

                    console.log("PPOST", post)

                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)
                    console.log(res)
                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve()
                } catch (err) {
                    reject(err)
                }

            })
        },

        studentNewPost({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    const post = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/courses/studentPosts`, credentials)

                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        },

        newFile({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    const post = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/courses/files`, credentials)

                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve(post)
                } catch (err) {
                    reject(err)
                }
            })
        },

        newAssignment({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log("CREDA", credentials)
                    const post = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/courses/assignments`, credentials)

                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve(post)
                } catch (err) {
                    reject(err)
                }
            })
        }
    },
}