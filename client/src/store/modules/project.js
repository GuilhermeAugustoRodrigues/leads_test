import basic from "./basic";
const { state, getters, mutations, actions } = basic;

import axios from "axios";

export default {
  namespaced: true,

  state: {
    ...state,

    modelName: "project",
    participants: [],
    suggestions: [],
  },

  getters: {
    ...getters,

    getParticipants: (state) => {
      return state.participants;
    },

    getSuggestions: (state) => {
      if (!state.participants.length) {
        return state.suggestions;
      }

      return getNonParticipantSuggestions(state);
    },
  },

  mutations: {
    ...mutations,

    setParticipants(state, records) {
      state.participants = records;
    },

    setSuggestions(state, records) {
      state.suggestions = records;
    },

    removeParticipant(state, record) {
      state.participants = state.participants.filter((o) => {
        return o.employee !== record.employee;
      });
    },
  },

  actions: {
    ...actions,

    async findParticipants({ commit }, projectId) {
      const response = await axios.get(`/project/${projectId}/participants`);
      commit("setParticipants", response.data);
      return response;
    },

    async findSuggestions({ commit }, projectId) {
      const response = await axios.get(`/project/${projectId}/suggestions`);
      commit("setSuggestions", response.data);
      return response;
    },

    async addEmployee({ dispatch }, data) {
      await axios.post(`/project/addEmployee`, data);
      dispatch(`findParticipants`, data.project);
    },

    async removeEmployee({ commit }, params) {
      await axios.delete(
        `/project/${params.project}/removeEmployee/${params.employee}`
      );
      commit("removeParticipant", params);
    },
  },
};

function getNonParticipantSuggestions({ suggestions, participants }) {
  const mappedParticipants = participants.map(
    (participant) => participant.Employee
  );

  const nonParticipantSuggestions = {};

  Object.keys(suggestions).forEach((key) => {
    nonParticipantSuggestions[key] = filterParticipantsFromSuggestions(
      suggestions[key],
      mappedParticipants
    );
  });

  return nonParticipantSuggestions;
}

function filterParticipantsFromSuggestions(suggestions, participants) {
  return suggestions.filter((suggestion) =>
    checkIfSuggestionExistsInParticipants(suggestion, participants)
  );
}

function checkIfSuggestionExistsInParticipants(suggestion, participants) {
  return !participants.some((participant) =>
    isSuggestionEqualToParticipant(suggestion, participant)
  );
}

function isSuggestionEqualToParticipant(suggestion, participant) {
  return (
    participant.id === suggestion.id && participant.email === suggestion.email
  );
}
