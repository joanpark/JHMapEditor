const CONFIG = {
    version: "0.1",

    asset_path: "public/tilesets/",

    maps: [
        { "name": "overworld",  "width": (32 * 4), "height": (22 * 2) },     // 32 tiles * 4 rooms by 22 tiles * 2 rooms (128x44 tiles)
    ],

    // the customisable tileset layers.
    // Required layers like collisions and entities are added automatically
    layers: [
        { "name": "bg" },
        { "name": "world" },
        { "name": "entities" },
        { "name": "top" },
        { "name": "collision" },
    ],
}