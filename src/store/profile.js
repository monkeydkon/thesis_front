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

        }
    }
}