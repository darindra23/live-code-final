import Vue from "vue";
import Vuex from "vuex";
import { axios, errorHandler } from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: [],
    reports: []
  },
  mutations: {
    getCountry(state, data) {
      state.countries = data;
    },
    getReports(state, data) {
      state.reports = data;
    }
  },
  actions: {
    async fetch({ commit }) {
      try {
        let { data } = await axios.get("/countries", {
          headers: {
            token: localStorage.token
          }
        });
        commit("getCountry", data);
      } catch (error) {
        errorHandler(error);
      }
    },
    async fetchReport({ commit }) {
      try {
        let { data } = await axios.get("/reports", {
          headers: {
            token: localStorage.token
          }
        });
        commit("getReports", data);
      } catch (error) {
        errorHandler(error);
      }
    }
  },
  modules: {}
});
