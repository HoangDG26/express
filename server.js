import { envConfig } from './src/configs/config.js'
import app from './src/utils/app.js'

const port = envConfig.app.port
app.listen(port, async () => {
    console.log(`Listening on port http://localhost:${port}`)
})