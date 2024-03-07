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

        Debug.log(`     -- Layer.init --`, LogCat.FLOW)

        this.name           = name                             // name of the layer
        this.tilesetNames   = tilesetNames  || new Array()     // array of the tileset names per cell
        this.data           = data          || new Array()     // The layer’s data. Could be the tileset indexes, the collision type indexes, or entity objects, or whatever!
        this.hidden         = false                            // flag for showing/hiding the layer in the viewport

        this.TILES_WIDE     = tilesWide
        this.TILES_HIGH     = tilesHigh

        return this;
    },

    createCanvas(){

        Debug.log(`     -- Layer.createCanvas --`, LogCat.FLOW)

        // store the map pixel dimensions
        this.WIDTH          = this.TILES_WIDE * Global.TILE_SIZE
        this.HEIGHT         = this.TILES_HIGH * Global.TILE_SIZE  

        // create a canvas per layer.
        // check for one we can already use (created on first page load)
        // this ties the object to the HTML which is generally bad. But don't care right now.
        this.canvas         = document.getElementById(this.name) || document.createElement('canvas')
        this.context        = this.canvas.getContext('2d')

        this.canvas.width   = this.WIDTH
        this.canvas.height  = this.HEIGHT
        this.canvas.setAttribute('id', this.name)

        // always initially hide the collision layer
        if( this.name === 'collision' ) {
            this.hide()
        }        
    },

    hide(){

    },

    renderTile(cell, clear=true){

        Debug.log(`-- Layer.renderTile --`, LogCat.FLOW)

        // TODO : [중요] 2 layer renderTile 함수 구현

        // There are two tile types, normal and collision. Collision is currently not an image, so is drawn differently.
        if( this.name != 'collision' ) {
            //const spriteCoords = sprite.cellToPx(tile);

            //this.context.drawImage(sprite.img, spriteCoords.x, spriteCoords.y, Global.TILE_SIZE, Global.TILE_SIZE, coords.x, coords.y, Global.TILE_SIZE, Global.TILE_SIZE);
        }
        else {
            
        }        
    },

    scale(scale) {
        this._scale = scale
        this.canvas.style['width']  = (this.WIDTH * scale) +'px'
        this.canvas.style['height'] = (this.HEIGHT * scale) +'px'
    },    

    render(){
        // TODO : [중요] 1 layer render 함수 구현

        // clear the whole layer
        this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT)

        // get the tile index and its tileset.
        let tile            = 0
        let tileset         = ''

        let coords          = {}
        let sprite          = {}
        let spriteCoords    = {}

        for(var cell = 0; cell < this.data.length; cell++) {

            if( this.name === 'entities' ) {
                // TODO : renderEntity 
            }
            else{



            }
        }
    }
}