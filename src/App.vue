<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import Movie from "@/components/Movie.vue";
import Search from "@/components/Search.vue";

const movieStore = useMovieStore();

console.log(import.meta.env)
</script>

<template>
	<main>
		<header class="header">
			<img src="/logo.svg" alt="logo" class="header__logo">
			<h2>My favourite Movies</h2>
		</header>

		<div class="tabs">
			<button @click="movieStore.setActiveTab(1)" :class="['btn', { 'btn--green': movieStore.activeTab === 1 }]">
				Favorite
			</button>
			<button @click="movieStore.setActiveTab(2)" :class="['btn', { 'btn--green': movieStore.activeTab === 2 }]">
				Search
			</button>
		</div>

		<div class="movies" v-if="movieStore.activeTab === 1">
			<div>
				<h3>Watched Movies (count: {{movieStore.watchedMovies.length}})</h3>
				<Movie :movie="movie" v-for="movie in movieStore.watchedMovies" :key="movie.id"/>
			</div>
			<h3>All Movies (count: {{movieStore.totalCountMovies}})</h3>
			<Movie :movie="movie" v-for="movie in movieStore.movies" :key="movie.id"/>
		</div>

		<div v-else class="search">
			<Search/>
		</div>
	</main>
</template>

<style lang="css">
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
}
.header__logo {
	max-width: 50px;
	margin-right: 10px;
}
.btn {
	border: none;
	width: 100px;
	height: 40px;
	font-size: 14px;
	margin: 0 10px;
	border-radius: 10px;
	cursor: pointer;
	background: #efefef;
}
.btn:hover {
	opacity: 0.7;
}
.btn--green {
	background: #37df5c;
}

.tabs {
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
}
</style>
