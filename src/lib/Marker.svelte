<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import L from 'leaflet';

	export let map: L.Map | undefined;
	export let width: number;
	export let height: number;
	export let latLng: L.LatLngExpression;

	const dispatch = createEventDispatcher();

	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	onMount(() => {
		if (map) {
			let icon = L.divIcon({
				html: markerElement,
				className: 'map-marker',
				iconSize: L.point(width, height),
			});
			marker = L.marker(latLng, { icon }).addTo(map).on('click', () => {
				map?.flyTo(latLng, 5);
				dispatch('select');
			});
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div bind:this={markerElement}>
	{#if marker}
		<slot {marker} />
	{/if}
</div>
