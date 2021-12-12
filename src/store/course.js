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
            commit('setClasses', res.data)

            localStorage.setItem('classes', JSON.stringify(res.data))
            commit('setSelectedClass')
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


                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)
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

        addMemberToClass({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    await axios
                        .post(
                            `${process.env.VUE_APP_BASE_URL}/api/courses/${credentials.course_id}/addUser`,
                            {
                                user_id: credentials.user_id,
                            }
                        );
                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))
                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        },

        removeMemberFromClass({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/courses/${credentials.course_id}/deleteUser/${credentials.user_id}`)
                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))
                } catch (err) {
                    reject(err)
                }
            });
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

        deleteFile({ commit }, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const del = await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/courses/files/${id}`)
                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve(del)
                }
                catch (err) {
                    reject(err)
                }
            })
        },

        deleteAssignment({ commit }, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const del = await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/courses/assignments/${id}`)
                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve(del)
                }
                catch (err) {
                    reject(err)
                }
            })
        },

        newAssignment({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    const post = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/courses/assignments`, credentials)

                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve(post)
                } catch (err) {
                    reject(err)
                }
            })
        },

        deletePost({ commit }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!credentials.student) {
                        const del = await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/courses/posts/${credentials.id}`)
                    } else {
                        const del = await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/courses/studentPosts/${credentials.id}`)
                    }

                    const res = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/courses`)

                    commit('setClasses', res.data)
                    localStorage.setItem('classes', JSON.stringify(res.data))

                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        }
    },
}