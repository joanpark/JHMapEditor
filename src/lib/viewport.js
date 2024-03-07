'use strict';

const Viewport = {

    setup(){

        Debug.log(`-- Viewport.setup --`, LogCat.FLOW)

        // elements
        this._viewport      = _('.Viewport')

        // states
        this.mouseX = 0
        this.mouseY = 0

        //
        this.startCell      = null;
        this.endCell        = null;


        // setup grid
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

        // TODO : [중요] 01 마우스 클릭시, map renderTile 구현

        this._viewport.addEventListener('mouseup', () => {
        })

        this._viewport.addEventListener('mousedown', () => {

            this.startCell      = this.getClickedCell()
            this.currentCell    = this.getClickedCell()

            this.placePattern()
        })

        this._viewport.addEventListener('mousemove', (e) => {
            this.mouseX = e.offsetX
            this.mouseY = e.offsetY
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

    getClickedCell() {
        return this.currentMap.pxToCell( (this.mouseX / this._scale), (this.mouseY / this._scale) )
    },

    placePattern() {
        const cell = this.getClickedCell()

        this.currentMap.addPattern(cell)
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