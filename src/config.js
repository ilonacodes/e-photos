const environment = process.env.NODE_ENV

const all_configs = {
    development: {
        apiUrl: "http://localhost:4567",
    },

    production: {
        apiUrl: "https://ephotos.herokuapp.com",
    }
}

export const config = all_configs[environment] || all_configs.development