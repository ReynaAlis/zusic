export default {
  state: {
    artists: [],
    recent: [],
    currentArtist: null
  },
  actions: {
    loadArtistList ({ commit }, { api }) {
      api.get('artists')
        .then(d => {
          commit('setArtistList', d.data)
        })
    }
  },
  mutations: {
    setArtistList (state, list) {
      state.artists = list.artists
      state.recent = list.recent
    },
    setCurrentArtist (state, artistId) {
      state.currentArtist = state.artists.find(item => item.id === String(artistId))
    },
    clearCurrentArtist (state) {
      state.currentArtist = null
    }
  }
}
