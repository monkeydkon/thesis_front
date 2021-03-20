import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classes: [
      {
        id: 1,
        name: 'Class1',
        teacher: 'Teacher Teacheropoulos',
        lesson: 'Mathematics',
        students: [
          {
            id: 1,
            name: 'Student Studentopoulos',
            email: 'test@mail.com',
          },
          {
            id: 2,
            name: 'Student Studentopoulos',
            email: 'test@mail.com',
          },
          {
            id: 3,
            name: 'Studentidis Studentos',
            email: 'test@mail.com',
          },
          {
            id: 4,
            name: 'Student Studentopoulos',
            email: 'test@mail.com',
          },
          {
            id: 5,
            name: 'Student Studentopoulos',
            email: 'test@mail.com',
          }
        ],
        posts: [
          {
            id: 1,
            title: 'How to do this?',
            body: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah '
          },
          {
            id: 2,
            title: 'How to do this?',
            body: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah '
          },
          {
            id: 3,
            title: 'How to do this?',
            body: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah '
          },
          {
            id: 4,
            title: 'How to do this?',
            body: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah '
          }
        ],
        studentPosts: [
          {
            id: 1,
            title: 'How to do this?',
            body: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
            student: {
              id: 5,
              name: 'Student Studentopoulos',
              email: 'test@mail.com',
            }
          },
          {
            id: 2,
            title: 'How to do this?',
            body: 'Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah ',
            student: {
              id: 3,
              name: 'Studentidis Studentos',
              email: 'test@mail.com',
            },
          },
        ],
        files: [
          {
            name: 'a file'
          },
          {
            name: 'another file'
          },
          {
            name: 'some other file here'
          }
        ]
      },
      {
        id: 2,
        name: 'Class2',
        teacher: 'Teacher Teacheropoulos',
        students: [],
        posts: []
      },
      {
        id: 3,
        name: 'Class4',
        teacher: 'Teacher Teacheropoulos',
        students: [],
        posts: []
      },
      {
        id: 4,
        name: 'Class4',
        teacher: 'Teacher Teacheropoulos',
        students: [],
        posts: []
      },
      {
        id: 5,
        name: 'Class5',
        teacher: 'Teacher Teacheropoulos',
        students: [],
        posts: []
      },
      {
        id: 6,
        name: 'Class6',
        teacher: 'Teacher Teacheropoulos',
        students: [],
        posts: []
      }
    ]
  },
  getters: {
    selectedClass: (state) => state.selectedClass
  },
  mutations: {
    setSelectedClass(state, id) {
      if (!id) {
        state.selectedClass = state.classes[0]
      } else {
        state.selectedClass = state.classes.find(c => c.id == id)
      }
    },
  },
  actions: {
    goToClasses({ commit, state }) {
      commit('setSelectedClass')
      router.push(`/classes/${state.selectedClass.id}/posts`)
    },
    selectClass({ commit, state }, id) {
      commit('setSelectedClass', id)
      router.push(`/classes/${state.selectedClass.id}/posts`)
    }
  },
  modules: {
    auth
  }
})
