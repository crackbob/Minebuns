import Module from "../../module";
import hooks from "../../../hooks";
import mathUtils from "../../../utils/mathUtils";

// too lazy to make real xray
export default class BlockFinder extends Module {
    constructor() {
        super("BlockFinder", "Misc", {
            "Search Radius": 16,
            "Block ID": 581
        });

        this.CHUNK_SIZE = 16;
        this.CHUNK_CHECK_MS = 200;

        this.foundBlocks = [];
        this.lastChunkKey = "";
        this.chunkInterval = null;
        this.raf = null;

        this.ui = null;
        this.listEl = null;
    }

    getPlayerChunk() {
        const p = hooks.gameWorld.player.position;
        return [
            Math.floor(p.x / this.CHUNK_SIZE),
            Math.floor(p.y / this.CHUNK_SIZE),
            Math.floor(p.z / this.CHUNK_SIZE)
        ];
    }

    createUI() {
        if (this.ui) return;

        const ui = document.createElement("div");
        ui.style.cssText = `
            position:fixed;
            top:80px;
            left:80px;
            width:260px;
            background:#111;
            color:#ddd;
            font:11px system-ui, sans-serif;
            border-radius:6px;
            box-shadow:0 6px 20px rgba(0,0,0,.4);
            z-index:99999;
            user-select:none;
        `;

        ui.innerHTML = `
            <div class="bf-head" style="
                padding:6px 8px;
                cursor:move;
                opacity:.85;
            ">
                Block Finder
            </div>
            <div class="bf-list" style="
                max-height:260px;
                overflow:auto;
                padding:4px 8px 8px;
                font-family:monospace;
                white-space:pre;
            "></div>
        `;

        document.body.appendChild(ui);

        this.ui = ui;
        this.listEl = ui.querySelector(".bf-list");

        let drag = false, ox = 0, oy = 0;
        const head = ui.querySelector(".bf-head");

        head.onmousedown = e => {
            drag = true;
            ox = e.clientX - ui.offsetLeft;
            oy = e.clientY - ui.offsetTop;
        };

        document.addEventListener("mousemove", this._dragMove = e => {
            if (!drag) return;
            ui.style.left = e.clientX - ox + "px";
            ui.style.top  = e.clientY - oy + "px";
        });

        document.addEventListener("mouseup", this._dragUp = () => {
            drag = false;
        });
    }

    destroyUI() {
        if (!this.ui) return;
        this.ui.remove();
        this.ui = null;
        this.listEl = null;

        document.removeEventListener("mousemove", this._dragMove);
        document.removeEventListener("mouseup", this._dragUp);
    }

    scanChunks() {
        const SEARCH_RADIUS = this.options["Search Radius"] | 0;
        const BLOCK_ID = this.options["Block ID"] | 0;

        const chunkManager = hooks.gameWorld.chunkManager;
        const base = this.getPlayerChunk();

        this.foundBlocks.length = 0;

        for (let cx = -SEARCH_RADIUS; cx <= SEARCH_RADIUS; cx++) {
            for (let cy = -SEARCH_RADIUS; cy <= SEARCH_RADIUS; cy++) {
                for (let cz = -SEARCH_RADIUS; cz <= SEARCH_RADIUS; cz++) {

                    const cX = base[0] + cx;
                    const cY = base[1] + cy;
                    const cZ = base[2] + cz;

                    const blocks = chunkManager.getChunkArray(cX, cY, cZ);
                    if (!blocks) continue;

                    for (let i = 0; i < blocks.length; i++) {
                        if (blocks[i] !== BLOCK_ID) continue;

                        const wx = (cX << 4) + (i & 15);
                        const wy = (cY << 4) + ((i >> 4) & 15);
                        const wz = (cZ << 4) + (i >> 8);

                        if (hooks.gameWorld.chunkManager.getBlock(wx, wy, wz) !== BLOCK_ID) continue;

                        this.foundBlocks.push([wx, wy, wz]);
                    }
                }
            }
        }
    }

    renderDistances = () => {
        if (!this.listEl) return;

        const p = [...hooks.gameWorld.player.position];

        if (this.foundBlocks.length === 0) {
            this.listEl.textContent = "none nearby";
        } else {
            this.listEl.textContent = this.foundBlocks
                .map(pos => ({
                    pos,
                    d: mathUtils.calculateDistanceArr(p, pos)
                }))
                .sort((a, b) => a.d - b.d)
                .map(v =>
                    `${v.pos[0]}, ${v.pos[1]}, ${v.pos[2]}  ${v.d.toFixed(1)}m`
                )
                .join("\n");
        }

        this.raf = requestAnimationFrame(this.renderDistances);
    };

    onEnable() {
        this.createUI();
        this.scanChunks();
        this.renderDistances();

        this.chunkInterval = setInterval(() => {
            const key = this.getPlayerChunk().join(",");
            if (key !== this.lastChunkKey) {
                this.lastChunkKey = key;
                this.scanChunks();
            }
        }, this.CHUNK_CHECK_MS);
    }

    onDisable() {
        clearInterval(this.chunkInterval);
        cancelAnimationFrame(this.raf);

        this.chunkInterval = null;
        this.raf = null;

        this.foundBlocks.length = 0;
        this.lastChunkKey = "";

        this.destroyUI();
    }
}
