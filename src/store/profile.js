import axios from 'axios'
export default {
    actions: {
        updateProfile({ dispatch, commit }, summary) {
            return new Promise((resolve, reject) => {
                axios.put(`${process.env.VUE_APP_BASE_URL}/api/user/profile`, summary)
                    .then(async res => {
                        await dispatch('getProfile')
                        dispatch('showSnack', {
                            text: 'Successfull update',
                            color: 'primary',
                            value: true
                        })
                        resolve()
                    })
                    .catch(err => {
                        dispatch('showSnack', {
                            text: 'Something went wrong',
                            color: 'error',
                            value: true
                        })
                        reject()
                    })
            })

        },

        updateProfilePicture({ dispatch }, formData) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BASE_URL}/api/user/profile/image`, formData, {
                    headers: {
                      "content-type": "multipart/form-data",
                    }
                })
                    .then(async res => {
                        await dispatch('getProfile')
                        resolve()
                    })
                    .catch(err => {
                        reject()
                    })
            })
        }
    }
}