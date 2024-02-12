'use strict';

const Viewport = {

    setup(){

        // TODO : setup grids

        // set the current map to the first map
        // setup the map’s visual properties
        const mapIdx = 0
        this.setupMap(Global.world.maps[mapIdx])
    },

    setupMap(map){
        this.currentMap = map
        this.currentMap.setup()

        this.render()
    },

    render(){
        const startTime = window.performance.now()

        this.currentMap.render()

        // TODO : render grid

        const endTime = window.performance.now();

        console.log(`map render time: ${(endTime - startTime)}ms`);
    }
}