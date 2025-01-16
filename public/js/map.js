const map = new maplibregl.Map({
    container: 'map', // container id
    style: {
        'version': 8,
        'name': 'Blank',
        'center': [0, 0],
        'zoom': 0,
        'sources': {
            'raster-tiles': {
                'type': 'raster',
                'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                'tileSize': 256,
                'minzoom': 0,
                'maxzoom': 19
            }
        },
        'layers': [
            {
                'id': 'background',
                'type': 'background',
                'paint': {
                    'background-color': '#e0dfdf'
                }
            },
            {
                'id': 'simple-tiles',
                'type': 'raster',
                'source': 'raster-tiles'
            }
        ],
        'id': 'blank'
    },
    center: coordinates,
    zoom: 9,
    pitch: 40,
    bearing: 20,
    antialias: true
});

// console.log(coordinates);

const marker = new maplibregl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .addTo(map);