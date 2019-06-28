export default {
  state: {
    tracks: []
  },
  actions: {
    loadTrackList ({ commit }, filter) {
      filter = filter || {}
      if(('albumId' in filter) && filter.albumId) {
        this._vm.$axios.get(`albums/${filter.albumId}`)
          .then(d => {
            commit('setTrackList', d.data.tracks)
            commit('mixinTrackAlbums', d.data.albums)
            commit('mixinTrackArtists', d.data.artists)
          })
        // @todo
        // commit('setTrackList', list)
      }
    }
  },
  mutations: {
    setTrackList (state, list) {
      state.tracks = list
    },
    mixinTrackAlbums (state, list) {
      state.tracks.forEach((track, i, arr) => {
        arr[i].album = list.find(a => a.id === track.album_id)
      })
    },
    mixinTrackArtists (state, list) {
      state.tracks.forEach((track, i, arr) => {
        arr[i].artist = list.find(a => a.id === track.artist_id)
      })
    }
  }
}
