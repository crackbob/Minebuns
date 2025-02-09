import hooks from "../hooks";

export default {
    get userStore () {
        return hooks.importedModules.find(m => m?.["$id"] == "userState")();
    },

    get itemMgrStore () {
        return hooks.importedModules.find(m => m?.["$id"] == "inventoryState")();
    },

    get roomMgrStore () {
        return hooks.importedModules.find(m => m?.["$id"] == "roomManager")();
    },

    get adsStore () {
        return hooks.importedModules.find(m => m?.["$id"] == "adsStore")();
    }
}