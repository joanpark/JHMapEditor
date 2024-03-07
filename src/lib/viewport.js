'use strict';

const Viewport = {

    setup(){

        Debug.log(`-- Viewport.setup --`, LogCat.FLOW)

        // elements
        this._viewport      = _('.Viewport');

        // TODO : setup grids

        // set the current map to the first map
        // setup the map’s visual properties
        const mapIdx = 0
        this.setupMap(Global.world.maps[mapIdx]) // create canvas per layer

        // add layers
        for (const layer of this.currentMap.layers) {
            this._viewport.appendChild(layer.canvas);
        }

        // events
        this.setupEvents()
    },

    setupMap(map){
        Debug.log(`-- Viewport.setupMap --`, LogCat.FLOW)

        this.currentMap = map
        this.currentMap.setup()

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

    render(){
        Debug.log(`-- Viewport.render --`, LogCat.FLOW)

        const startTime = window.performance.now()

        this.currentMap.render()

        // TODO : render grid

        const endTime = window.performance.now();

        Debug.log(`map render time: ${(endTime - startTime)}ms`);
    },
}