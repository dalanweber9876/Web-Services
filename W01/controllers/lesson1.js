const jenniferRoute = (req, res) => {
    res.send("Jennifer Weber");
};

const lilyRoute = (req, res) => {
    res.send("Lily Weber");
};

const danRoute = (req, res) => {
    res.send("Dan Weber");
};

const lanaRoute = (req, res) => {
    res.send("Lana Weber");
};

module.exports = {
    jenniferRoute,
    lilyRoute,
    danRoute,
    lanaRoute
}