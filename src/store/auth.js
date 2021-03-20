module.exports = {
    state: {
    },
    mutations: {
    },
    actions: {
        login({ }, credentials) {
            return new Promise((resolve, reject) => {
                resolve(credentials)
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