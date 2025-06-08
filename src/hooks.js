export default {
    init: async function () {
        let safeImport = (src) => eval(`(async () => { return await import("${src}")})()`);
        let preloadedModules = Array.from(document.querySelectorAll('link[rel="modulepreload"]')).map(link => link.href);
        preloadedModules.push(Object.values(document.scripts).find(script => script?.src?.includes(location.origin)).src);
        let importedModules = await Promise.all(preloadedModules.map(url => safeImport(url)));
        let allModuleExports = importedModules.flatMap(module => Object.values(module));
        this.stores = Object.values(allModuleExports).filter(exports => exports?.$id).reduce((acc, exports) => (acc[exports.$id] = exports(), acc), {});
        this.network = Object.values(allModuleExports).find(m => m?.service);
    },

    get gameWorld () {
        return this?.stores?.gameState?.gameWorld || null;
    }
}