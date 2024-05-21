import { defineStore } from "pinia";
import {useMovieStore} from "@/stores/MovieStore.js";
const url =
    "https://api.themoviedb.org/3/search/movie?api_key=02708c4929ad93aa5e68f8ee7bfa4445&query=";

export const useSearchStore = defineStore("searchStore", {
    state: () => ({
        loader: false,
        movies: [],
    }),
    actions: {
        async getMovies(search) {
            this.loader = true;

            try {
                const res = await fetch(`${url}${search}`);
                const data = await res.json();
                this.movies = data.results;
            } catch (err) {
                console.log('err', err)
            } finally {
                this.loader = false;
            }
        },
        addToUserMovies(obj) {
            const movieStore = useMovieStore();
            movieStore.movies.push({...obj, isWatched: false})
            movieStore.activeTab = 1
        }
    },
});