'use strict';
/**
    Layer

    A layer is both the conceptual database of a game’s maps (data arrays), 
    and also the visual representation of that data (canvas object). It handles 
    the storing and fetching of the tile indexes at given cell coordinates along 
    with the tileset it belongs to. And it also handles the rendering of that tile 
    to its canvas.

    Storing both the tileset and the index in parallel arrays is the best way I can 
    think of to handle tileset changes during the editing process. It is resilient 
    to re-ordering, enlarging and adding more tilesets.

    Note:
        I’m not totally sold on having one Layer object handling all layer-related 
        duties, but I can’t think of a better way to separate data and presentation 
        right now. I imagine there should be some kind of Renderer object. 
        Possibly also some LayerManager object.
**/

const Layer = {

    init(name, tilesWide, tilesHigh, tilesetNames, data) {
        this.name           = name;                             // name of the layer
        this.tilesetNames   = tilesetNames  || new Array();     // array of the tileset names per cell
        this.data           = data          || new Array();     // The layer’s data. Could be the tileset indexes, the collision type indexes, or entity objects, or whatever!
        this.hidden         = false;                            // flag for showing/hiding the layer in the viewport

        this.TILES_WIDE     = tilesWide;
        this.TILES_HIGH     = tilesHigh;

        return this;
    },

    renderTile(){

    }
}