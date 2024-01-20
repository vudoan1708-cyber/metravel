<script lang="ts">
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  import { env } from '$env/dynamic/public';

  export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;

  const dispatch = createEventDispatcher();

  let map: L.Map | undefined;
  let mapElement: HTMLElement;

  // Life Cycle
  onMount(() => {
    map = L
      .map(mapElement, {
        center: [51.505, -0.09],
        zoom: 4,
      })
      .on('zoom', (e) => dispatch('zoom', e))
      .on('popupopen', async (e) => {
        await tick();
        e.popup.update();
      });

    const geojsonFeature = [{
      type: 'Feature',
      properties: {
        name: 'Coors Field',
        amenity: 'Baseball Stadium',
        popupContent: 'This is where the Rockies play!',
      },
      geometry: {
        type: 'Point',
        coordinates: [ -104.99404, 39.75621 ],
      }
    }];

    L.tileLayer(`https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${env.PUBLIC_GEOAPIFY_API_KEY}`, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
      maxZoom: 20, id: 'osm-bright'
    }).addTo(map);

    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: '#ff7800',
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };
  });

  onDestroy(() => {
		map?.remove();
		map = undefined;
	});

  $: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}
</script>

<!-- <template> -->
<div class="metravel-map" bind:this={mapElement}>
  {#if map}
    <slot {map} />
  {/if}
</div>
<!-- </template> -->

<style>
  .metravel-map {
    position: relative;
    width: 100%;
    height: 100vh;
  }
</style>
