<script lang="ts">
  import type { LatLng } from 'leaflet';

  import Leaflet from '$lib/Leaflet.svelte';
  import Marker from '$lib/Marker.svelte';
  import Popup from '$lib/Popup.svelte';

  import NewLocation from '$lib/NewLocation.svelte';

  export let data;

  const markerLocations = data.journalEntry;

  let searchedKeyword: string | null = '';
  let searchedLocations: any[] = [];
  // Event Handlers
  const onLocationSearched = ({ detail }: { detail: any }) => {
    searchedLocations = detail.results.data.results;
    searchedKeyword = detail.keyword;
  };
  const onStageChange = ({ detail }: { detail: 'search' | 'approveLocation' | 'popup' }) => {
    if (detail === 'search') {
      searchedKeyword = '';
      searchedLocations = [];
    }
  };
  const onMarkerSelect = (loc: any) => {
    searchedLocations = [ loc ];
  };
</script>

<!-- <template> -->
<div class="metravel-map">
  <Leaflet {searchedLocations} let:map>
    {#each markerLocations as loc}
      <Marker
        {map}
        width={40}
        height={40}
        latLng={loc.latlng}
        let:marker>
        <svg
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
					viewBox="0 0 45 40"
				>
					<path
						d="m23.046 25.449 9.601 16.885H13.253l9.793-16.885ZM45 23.965H25.702l9.575 16.84L45 23.965ZM44.963 20.923 35.339 4.254l-9.668 16.669h19.292ZM32.771 2.618h-4.17L8.522 37.237l2.08 3.603L32.771 2.618ZM25.084 2.618H11.465L0 22.476l6.768 11.722 18.316-31.58Z"
						style="fill:#e9204f;fill-rule:nonzero"
						transform="translate(0 -2.618)"
					/>
				</svg>
        <Popup layer={marker}>
          {@html loc.popup}
        </Popup>
      </Marker>
    {/each}

    {#each searchedLocations as loc}
      <Marker
        {map}
        width={40}
        height={40}
        latLng={[ loc.lat, loc.lon ]}
        on:select={() => { onMarkerSelect(loc); }}
        let:marker>
        <svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 293.334 293.334" xml:space="preserve" fill="#f00000" stroke="#f00000" stroke-width="8.80002"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path style="fill:#947505;" d="M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878 c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212 c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084 c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358 c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307 C198.98,120.938,175.559,144.358,146.667,144.358z"></path> <circle style="fill:#947505;" cx="146.667" cy="90.196" r="21.756"></circle> </g> </g> </g></svg>
        <Popup layer={marker}>
          {@html loc.formatted}
        </Popup>
      </Marker>
    {/each}
  </Leaflet>

  <NewLocation
    {searchedKeyword}
    {searchedLocations}
    on:searched={onLocationSearched}
    on:stageChange={onStageChange} />
</div>
<!-- </template> -->

<style>
  :global(.metravel-map img) {
    width: 100%;
  }
</style>
