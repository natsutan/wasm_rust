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
        console.log("start wasm ");
        console.log("currnet turn is " + instance.exports.get_current_turn());
        let piece = instance.exports.get_piece(0, 7);
        console.log("0, 7 is " + piece);

        let res = instance.exports.move_piece(0, 5, 1, 4);
        console.log("first move :" + res );
        console.log("currnet turn is " + instance.exports.get_current_turn());

        let bad = instance.exports.move_piece(1, 4, 2, 3);
        console.log("Illegal move :" + bad);
        console.log("currnet turn is " + instance.exports.get_current_turn());


    }).catch(console.error);
