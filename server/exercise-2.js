// JSON 
let values = {
    1: {
        carrier: "CCH",
        service: "DEX",
    },
    17: {
        carrier: "CHP",
        service: "express",
    }
}
// JSON
let json = {
    data: {
        BUIN: {
            limit: 1,
            over_carrier_service_id: 17,
            under_carrier_service_id: 17
        },
        LAJA: {
            limit: 1,
            over_carrier_service_id: 1,
            under_carrier_service_id: 1
        },
        LEBU: {
            limit: 1,
            over_carrier_service_id: 1,
            under_carrier_service_id: 1
        },
        LOTA: {
            limit: 1,
            over_carrier_service_id: 17,
            under_carrier_service_id: 17
        }
    }
}

let response = json;

let { BUIN } = response.data.BUIN
BUIN = {
    limit: 1,
    over: {
        carrier: "CHP",
        service: "express",
    },
    under: {
        carrier: "CHP",
        service: "express",
    }
}

let { LAJA } = response.data.LAJA
LAJA = {
    limit: 1,
    over: {
        carrier: "CCH",
        service: "DEX",
    },
    under: {
        carrier: "CCH",
        service: "DEX",
    }
}

let { LEBU } = response.data.LEBU
LEBU = {
    limit: 1,
    over: {
        carrier: "CCH",
        service: "DEX",
    },
    under: {
        carrier: "CCH",
        service: "DEX",
    }
}

let { LOTA } = response.data.LOTA
LOTA = {
    limit: 1,
    over: {
        carrier: "CHP",
        service: "express",
    },
    under: {
        carrier: "CHP",
        service: "express",
    }
}

response.data.BUIN = BUIN
response.data.LAJA = LAJA
response.data.LEBU = LEBU
response.data.LOTA = LOTA

console.log(response.data)