import axios from 'axios';
import router from '../router';
import jwt_decode from "jwt-decode";
export default {
    state: {
        jwt: localStorage.getItem('jwt') || null
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
        }

    },
    actions: {
        login({ commit, dispatch }, credentials) {
            console.log('xaxa')
            return new Promise(async (resolve, reject) => {
                try {
                    axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/login`, credentials)
                        .then(async res => {
                            const jwt = res.data.access_token
                            localStorage.setItem('jwt', jwt)
                            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
                            commit('login', jwt)
                            const me = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/me`)
                            console.log("ME",me)
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

        logout({ commit }) {
            commit('logout')
            localStorage.removeItem('jwt')
            delete axios.defaults.headers.common['Authorization']
            router.push('/login')
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