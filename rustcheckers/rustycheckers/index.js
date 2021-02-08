fetch('./target/wasm32-unknown-unknown/release/rustycheckers.wasm').then(response =>
    response.arrayBuffer()
    ).then (bytes => WebAssembly.instantiate(bytes, {
        env: {
            notify_piecemoved: (fX, fY, tX, tY) => {
                console.log("A piece moved from (" + fX + "," + fY + ") to (" + tX + "," + tY + ")");
            },
            notify_piececrowned: (x, y) => {
                console.log("A piece was crownd at (" + x + "," + y + ")")
            }
        },
    })).then (results => {
        instance = results.instance;
        console.log("start wasm ")
    }).catch(console.error);
