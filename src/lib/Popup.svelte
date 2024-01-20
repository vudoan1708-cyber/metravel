<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';

  export let layer: L.Layer | undefined;

	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	let open = false;

	onMount(() => {
		popup = L.popup().setContent(popupElement);

		if (layer) {
			layer.bindPopup(popup);
			layer.on('popupopen', () => { open = true; });
			layer.on('popupclose', () => { open = false; });
		}
	});

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div bind:this={popupElement}>
	{#if open}
		<slot />
	{/if}
</div>
