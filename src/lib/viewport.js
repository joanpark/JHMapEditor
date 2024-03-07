'use strict';

const Viewport = {

    setup(){

        Debug.log(`-- Viewport.setup --`, LogCat.FLOW)

        // elements
        this._viewport      = _('.Viewport');

        this.grid = Object.create(Grid)
        this.grid.init(0, 0, Global.TILE_SIZE, Global.TILE_SIZE)

        // set the current map to the first map
        // setup the map’s visual properties
        const mapIdx = 0
        this.setupMap(Global.world.maps[mapIdx]) // create canvas per layer

        // add layers
        for (const layer of this.currentMap.layers) {
            this._viewport.appendChild(layer.canvas)
        }

        this._viewport.appendChild(this.grid.canvas)

        // events
        this.setupEvents()
    },

    setupMap(map){
        Debug.log(`-- Viewport.setupMap --`, LogCat.FLOW)

        this.currentMap = map
        this.currentMap.setup()

        this.grid.resize(this.currentMap.getWidthInPx(), this.currentMap.getHeightInPx())

        this.scale(Global.scale)
        this.render()
    },

    setupEvents(){

        Debug.log(`-- Viewport.setupEvents --`, LogCat.FLOW)

        // TODO : [중요] 마우스 클릭시, map renderTile 구현

        this._viewport.addEventListener('mouseup', () => {
        })

        this._viewport.addEventListener('mousedown', () => {
        })

        this._viewport.addEventListener('mousemove', (e) => {
        })        
    },

    scale(scale){
        this._scale = scale

        this.currentMap.scale(scale)

        this.grid.scale(scale)
        this.grid.render()

        this._viewport.style['width']   = (this.currentMap.getWidthInPx() * scale) + 'px'
        this._viewport.style['height']  = (this.currentMap.getHeightInPx() * scale) + 'px'
    },

    render(){
        Debug.log(`-- Viewport.render --`, LogCat.FLOW)

        const startTime = window.performance.now()

        this.currentMap.render()

        this.grid.render()

        const endTime = window.performance.now();

        Debug.log(`map render time: ${(endTime - startTime)}ms`);
    },
}