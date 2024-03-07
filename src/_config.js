const CONFIG = {
    version: "0.1",

    asset_path: "public/images/tilesets/",

    maps: [
        { "name": "overworld",  "width": (32 * 1), "height": (22 * 1) },     // 32 tiles * 1 rooms by 22 tiles * 1 rooms (32x22 tiles)
    ],

    tilesets: [
        { "name": "room_builder_floors",  "src": "Room_Builder_Floors_16x16_mini.png" },        
        { "name": "overworld-terrain",  "src": "overworld-terrain.png" },
        /*
        { "name": "overworld-cliffs",   "src": "overworld-cliffs.png" },
        { "name": "overworld-flora",    "src": "overworld-flora.png" },
        { "name": "water",              "src": "water.png" },
        { "name": "misc",               "src": "misc.png" },
        { "name": "caves",              "src": "caves.png" },
        { "name": "dungeon",            "src": "dungeon.png" },*/
    ],    

    // the customisable tileset layers.
    // Required layers like collisions and entities are added automatically
    layers: [
        { "name": "bg"},
        { "name": "world" },
        { "name": "entities" },
        { "name": "top" },
        { "name": "collision" },
    ],
}