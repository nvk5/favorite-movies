<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import {useSearchStore} from "@/stores/SearchStore.js";

const movieStore = useMovieStore();
const searchStore = useSearchStore();

const props = defineProps({
	movie: {
		type: Object,
		required: true,
		default: () => {}
	},
	isSearch: {
		type: Boolean,
		required: false,
		default: false,
	},
})
</script>

<template>
	<div class="movie">
		<img
			:src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
			:alt="movie.original_title"
			class="movie__img"
		/>
		<div>
			<div class="movie__name">{{movie.original_title}} {{movie.release_date}}</div>
			<span class="movie__overview">{{movie.overview}}</span>
			<div class="movie__buttons" v-if="!isSearch">
				<button class="btn movie__buttons-watched" @click="movieStore.toggleWatch(movie.id)">
					<span v-if="!movie.isWatched">Watched</span>
					<span v-else>Unwatched</span>
				</button>
				<button @click="movieStore.deleteMovie(movie.id)" class="btn movie__buttons-delete">Delete</button>
			</div>
			<div class="movie__buttons" v-else>
				<button class="btn btn--green" @click="searchStore.addToUserMovies(movie)">Add</button>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>
@import "movie.css";
</style>