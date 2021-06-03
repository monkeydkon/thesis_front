import axios from 'axios';
import router from '../router';
import jwt_decode from "jwt-decode";
export default {
    state: {
        jwt: localStorage.getItem('jwt') || null,
        profile: JSON.parse(localStorage.getItem('profile')) || null
    },
    getters: {
        isLoggedIn: state => !!state.jwt,
        role: state => !!state.jwt ? jwt_decode(state.jwt).role : null
    },
    mutations: {
        login(state, jwt) {
            state.jwt = jwt
        },
        logout(state) {
            state.jwt = null;
        },
        profile(state, profile) {
            state.profile = profile
            localStorage.setItem('profile', JSON.stringify(profile))
        }

    },
    actions: {
        login({ commit, dispatch }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/login`, credentials)
                        .then(async res => {
                            const jwt = res.data.access_token
                            localStorage.setItem('jwt', jwt)
                            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
                            commit('login', jwt)
                            await dispatch('getProfile')
                            resolve(res)
                        })
                        .catch(err => {
                            dispatch('logout')
                            reject(err)
                        })

                } catch (err) {
                    reject(err)
                }

            })
        },

        register({ }, credentials) {
            return new Promise(async (resolve, reject) => {
                try {
                    axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/register`, credentials)
                        .then(async res => {
                            resolve(res)
                        })
                        .catch(err => {
                            reject(err)
                        })
                } catch (err) {
                    reject(err)
                }
            })
        },

        refresh({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const refresh = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/refresh`)
                    const jwt = refresh.data.access_token
                    localStorage.setItem('jwt', jwt)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
                    commit('login', jwt)
                    resolve()
                } catch (err) {
                    reject(err)
                }
            })
        },

        logout({ commit }) {
            commit('logout')
            localStorage.removeItem('jwt')
            delete axios.defaults.headers.common['Authorization']
            router.push('/login')
        },

        async getProfile({ commit }) {
            const me = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/me`)
            commit('profile', me.data)
        },

        forgot({ }, email) {
            return new Promise((resolve, reject) => {
                resolve(email)
            })
        }
    },
    modules: {
    }
}