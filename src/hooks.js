import events from "./events";

export default {
    get gameWorld() {
        return hooks.importedModules.find(m => m?.["$id"] == "gameState")().gameWorld;
    },
    get networkService() {
        return hooks.importedModules.find(m => m?.service);
    },
    "init" () {
        let fnString = document.querySelector("#app").__vue_app__._context.config.globalProperties.$router.options.routes[0].children[0].component.toString();
        this.chunks = eval("[" + fnString.split('[')[1].replace(")", "").split(",")).filter(src => src.includes(".js"));
        let userImport = Object.values(document.scripts).find(script => script?.src?.includes("index")).src.replace("https://minefun.io/", "");
        this.importedModules = [];

        this.chunks.push(userImport);

        Function(`
            async function initHooks() {
                await Promise.all(this.chunks.map(async (src) => {
                    const module = await import("https://minefun.io/" + src);
                    Object.values(module).forEach((mod) => {
                        this.importedModules.push(mod);
                    });
                }));
            }
            initHooks.chunks = this.chunks;
            initHooks.importedModules = this.importedModules;
            return initHooks;
        `)().bind(this)();
    }
}