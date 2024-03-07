'use strict';
/**

    GameMap

    (had to rename from Map as in ES6 there is a new Map() object 
    and it was causing conflicts)
    Handles all Map-related properties and functionality.

*/

const GameMap = {

    init(config = {}, layers=[{name: 'bg'}]){

        Debug.log(`-- GameMap.init --`, LogCat.FLOW)

        //
        this.name           = config.name       || '';
        this.TILES_WIDE     = config.width      || Global.DEFAULT_ROOM_W; // default: one room wide
        this.TILES_HIGH     = config.height     || Global.DEFAULT_ROOM_H; // default: one room tall
        this.layers         = [];

        // setup the layers
        for (var layer of layers) {
            layer.tilesetNames  = layer.tilesetNames    || null;
            layer.data          = layer.data            || null;

            this.initLayer( layer.name, layer.tilesetNames, layer.data );
        }

        return this;
    },

    initLayer(name, tilesetNames, data) {

        Debug.log(`     -- GameMap.initLayer --`, LogCat.FLOW)

        name = name || 'Layer ' + (this.layers.length + 1);

        let layer = Object.create(Layer);
        layer.init(name, this.TILES_WIDE, this.TILES_HIGH, tilesetNames, data);

        this.layers.push(layer);
    },    

    setup(){

        Debug.log(`-- GameMap.setup --`, LogCat.FLOW)

        // store the map pixel dimensions
        this.WIDTH          = this.TILES_WIDE * Global.TILE_SIZE;
        this.HEIGHT         = this.TILES_HIGH * Global.TILE_SIZE; 
        this.selectedLayer  = 0;
        
        // setup the layers
        for (var layer of this.layers) {
            layer.createCanvas();
        }
    },

    getWidthInPx() {
        return this.WIDTH;
    },

    getHeightInPx() {
        return this.HEIGHT;
    },

    pxToCell(x, y) {
        let row = Math.floor( (y / this.HEIGHT) * this.TILES_HIGH );
        let col = Math.floor( (x / this.WIDTH) * this.TILES_WIDE );

        return (row * this.TILES_WIDE) + col;
    },

    addPattern(cell){
        var layer = this.layers[this.selectedLayer]

        let tileIndex = 0

        layer.addTile(cell, tileIndex, "room_builder_floors")
        layer.renderTile(cell)
    },

    scale(scale) {
        this._scale = scale;
        for (var layer of this.layers) {
            layer.scale(scale)
        }
    },

    render(){
        Debug.log(`-- GameMap.render --`, LogCat.FLOW)

        for(var layer of this.layers) {
            layer.render();
        }
    },

    renderTile(cell){
        Debug.log(`-- GameMap.renderTile --`, LogCat.FLOW)

        this.layers[this.selectedLayer].renderTile(cell)
    }
}