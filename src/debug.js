'use strict';

/**
 * Debug()
 * 
 * 디버그 관련 유틸 객체
 * 
 */

const LogCat = {
    NONE: 'none',
    DEFAULT: 'default', 
    FLOW: 'flow',
}
Object.freeze(LogCat); // 객체를 동결(enum 처럼 사용하기 위해)

const Debug = {


    init(){

        this.bUseLog = true
        this.logCatList = []

        this.logCatList.push(LogCat.DEFAULT)
        this.logCatList.push(LogCat.FLOW)

    },


    log(msg, logCat = LogCat.DEFAULT){

        if(this.bUseLog == false ) return

        if(this.logCatList.includes(logCat)){
            console.log(msg)
        }
    }
}