import {defineStore} from 'pinia'
import {computed, ref, watch} from "vue";

export const useMovieStore = defineStore('movieStore', () => {
    const movies = ref([]);
    const activeTab = ref(1);

    const moviesOnLocalStorage = localStorage.getItem('movies');
    if (moviesOnLocalStorage) {
        movies.value = JSON.parse(moviesOnLocalStorage)
        console.log(JSON.parse(moviesOnLocalStorage));
    }

    const watchedMovies = computed(() => {
        return movies.value.filter(film => film.isWatched)
    })
    const totalCountMovies = computed(() => {
        return movies.value.length
    })

    const setActiveTab = (tab) => activeTab.value = tab;
    const toggleWatch = (id) => {
        const index = movies.value.findIndex(el => el.id === id);
        movies.value[index].isWatched = !movies.value[index].isWatched
    }
    const deleteMovie = (id) => {
        movies.value = movies.value.filter(item => item.id !== id);
    }

    watch(() => movies.value, (moviesValue) => {
        localStorage.setItem('movies', JSON.stringify(moviesValue))
    }, {deep: true})

    return {
        movies, activeTab, watchedMovies, totalCountMovies, setActiveTab, toggleWatch, deleteMovie
    }
})