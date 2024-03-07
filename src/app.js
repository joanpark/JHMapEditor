'use strict';

/**
 * strict mode :
 * -ES5 (2009)의 가장 중요한 기능
 * -프로그램을 더 간단하게 만들고 오류 발생 가능성을 낮춤
 * -구형 브라우저에서는 단순히 문자열일뿐, 무시된다 (하위 호환성 유지)
 * -선언방법: 개별 유효범위마다 선언(함수 or 전역)
 * -ES는 추후 스트릭트 모드만을 지원 계획(즉 ES5는 개발자들에게
 * 스트릭트 모드에서 동작하는 코드를 작성하도록 권장하는 과도적 버전)
 * 
 * https://beomy.tistory.com/13
 */

/**
    App()

    This is the main object which glues all the components together.
    Upon initialization, we:

    - Setup the Viewport...
    - Render the map
    - Setup events

 */

const App = {

    async init(config = {}){

        // set up a global object for use throughout the app.
        window.Global           = {}

        // Set Globals
        Global.DEFAULT_ROOM_W   = 32
        Global.DEFAULT_ROOM_H   = 22
        Global.TILE_SIZE        = config.tile_size  || 16
        Global.scale            = config.scale      || 2
        Global.assetPath        = config.asset_path || ''

        Global.world            = {}
        Global.tilesetsArray    = [] // array of Sprite objects        
         
        // some initialization stuff
        this.maps               = config.maps       || [{ "name": "default", "width": Global.DEFAULT_ROOM_W, "height": Global.DEFAULT_ROOM_H }]
        this.layers             = config.layers     || [{ "name": "bg" }]
        this.tilesets           = config.tilesets   || []        

        // construct the internal data structure
        Global.world.maps = [];
        for (const mapObj of this.maps) {
            const obj = {
                name: mapObj.name,
                width: mapObj.width,
                height: mapObj.height,
                layers: [],
            };
            for (const layerObj of this.layers) {
                obj.layers.push({
                    name: layerObj.name,
                });
            }
            Global.world.maps.push(obj);
        }

        // load all the things!
        Debug.init()
        await DB.init('JHMapEditor', 1, 'world')
        await this.loadAssets()
        await this.initMap() // init map -> init layer
        Viewport.setup() // setup map -> setup layer

        Debug.log(`-- end of App.init --`, LogCat.FLOW)
    },

    /**
     * Loops through the provided list of assets and loads them into memory.
     * Returns a promise.
     */
    loadAssets() {
        const promises = [];

        // loop through the provided tilesetsand create an array of promises
        for (const tileset of this.tilesets) {
            const sprite = Object.create(Sprite);
            Global.tilesetsArray.push(sprite);

            promises.push(sprite.init(tileset.name, Global.assetPath + tileset.src));
        }

        return Promise.all(promises);
    },

    /**
     * Load map data
     */
    async initMap() {
        Debug.log(`-- App.initMap --`, LogCat.FLOW)

        const result = await DB.getItem('world')

        let world   = {}
        world.maps  = []

        // TODO : level data found. Load it.
        if( result !== undefined ) {
            console.log('world db found')
        }

        // construct the map and layer world objects
        for (const mapConfig of Global.world.maps) {
            let map = Object.create(GameMap);
            map.init({
                name: mapConfig.name,
                width: mapConfig.width,
                height: mapConfig.height
            }, mapConfig.layers);

            world.maps.push(map);
        }

        // store the map data globally.
        Global.world = world;

    }
}