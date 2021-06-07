import axios from 'axios'
export default {
    state: {
        blogs: []
    },
    mutations: {
        getBlogs(state, blogs) {
            state.blogs = blogs
        }
    },
    actions: {
        postBlog({ dispatch }, blog) {
            return new Promise((resolve, reject) => {
                axios.post(`${process.env.VUE_APP_BASE_URL}/api/user/blogs`, {
                    title: blog.title,
                    content: blog.content
                })
                    .then(async res => {
                        try {
                            if (!!blog.photo) {
                                const formData = new FormData()
                                formData.append('photo', blog.photo)
                                await axios.post(`${process.env.VUE_APP_BASE_URL}/api/user/blogs/${res.data.id}/photo`, formData, {
                                    headers: {
                                        'content-type': 'multipart/form-data'
                                    }
                                })
                            }
                            await dispatch('getBlogs')
                            dispatch('showSnack', {
                                text: 'Successfull submit',
                                color: 'primary',
                                value: true
                            })
                            resolve()
                        } catch (err) {
                            reject(err)
                        }

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

        getBlogs({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get(`${process.env.VUE_APP_BASE_URL}/api/user/blogs/all`)
                    .then((res) => {
                        commit('getBlogs', res.data)
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