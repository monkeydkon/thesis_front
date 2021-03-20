import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: {
                    base: '#2B357C',
                    darken1: '#1D2353',
                    lighten1: '#F4F5F9'
                },
                secondary: '#01CB99',
                third: '#EBB62C',
                error: '#EBB62C'
            }
        },
        options: {
            customProperties: true
        }
    },
});
