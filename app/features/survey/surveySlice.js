import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  survey: null,
  currentSurveys: [],
  comments: [],
  currentSection: 1,
  totalSurveys: 0,
  dailySurveys: [],
  profileSurveys: [],
  newestSurveys: [],
  ownSurveys: [],
};

export const surveySlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSurvey: (state, action) => {
      state.survey = action.payload.survey;
    },
    setOwnSurvey: (state, action) => {
      state.ownSurveys = action.payload.survey;
    },
    getSurveys: (state, action) => {
      let payload = action.payload;
      const loadMore = payload.loadMore;

      state.currentSurveys = loadMore
        ? [...state.currentSurveys, ...payload.data.surveys]
        : payload.data.surveys;
      state.currentSection = Number(payload.section + 1);
      state.totalSurveys = payload.data.total;

      if (!loadMore) state.newestSurveys = payload.data.surveys;
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    like: (state, action) => {
      let payload = action.payload;
      const surveys = state.currentSurveys;
      let index = surveys.findIndex(({ _id }) => _id === payload.survey._id);
      index !== -1 && surveys.splice(index, 1);

      state.survey = payload.survey;
      state.currentSurveys =
        index !== -1 ? [...surveys, payload.survey] : surveys;
    },
    deleteSurvey: (state, action) => {
      state.survey = null;
      state.currentSurveys = state.currentSurveys.filter(
        (currSurvey) => currSurvey._id !== action.payload
      );
    },
    getComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    setDailySurveys: (state, action) => {
      state.dailySurveys = action.payload.surveys;
    },
    updateDailySurveys: (state, action) => {
      let payload = action.payload;
      state.dailySurveys = state.dailySurveys.map((survey) =>
        survey._id === payload.survey._id ? { ...payload.survey } : survey
      );
    },
    setProfileSurveys: (state, action) => {
      let payload = action.payload;
      if (payload.ownProfile) state.ownSurveys = payload.data.surveys;
      else state.profileSurveys = payload.data.surveys;
    },
    clear: (state) => {
      state.survey = null;
      state.comments = [];
      state.profileSurveys = [];
      state.currentSurveys = state.newestSurveys;
      state.currentSection = 1;
    },
  },
});

export const {
  setSurvey,
  getSurveys,
  like,
  deleteSurvey,
  getComments,
  setDailySurveys,
  clear,
  setProfileSurveys,
  updateDailySurveys,
  setCurrentSection,
} = surveySlice.actions;

export default surveySlice.reducer;
