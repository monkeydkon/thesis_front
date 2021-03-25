import axios from 'axios';
export default {
    state: {
    },
    mutations: {
    },
    actions: {
        login({ }, credentials) {
            console.log('xaxa')
            return new Promise(async (resolve, reject) => {
                try{
                    axios.post(`${process.env.VUE_APP_BASE_URL}/api/auth/login`, credentials)
                    .then(res => {
                        console.log(res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
               
                }catch(err){
                    reject(err)
                }
                
            })
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