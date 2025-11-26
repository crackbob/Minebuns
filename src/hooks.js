export default {
    get stores () {
        if (this._stores) {
            return this._stores;
        } else {
            let provides = app._vnode.component.appContext.provides;
            let appState = provides[Object.getOwnPropertySymbols(provides).find(sym => provides[sym]._s)];
            return this._stores = appState._s;
        }
    },

    get gameWorld () { 
        return this.stores.get("gameState").gameWorld;
    }
};