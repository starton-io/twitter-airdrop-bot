const { default: axios } = require('axios')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')
require('dotenv').config()

/**
 * Init Starton
 */
const starton = axios.create({
    baseURL: "https://api-connect.starton.io/v1",
    headers: {
        "x-api-key": process.env.STARTON_API_KEY,
    },
})

const successWriter = createCsvWriter({
    path: 'hash.csv',
    header: [
        {id: 'address', title: 'address'},
        {id: 'hash', title: 'hash'},
    ]
})

const failWriter = createCsvWriter({
    path: 'fail.csv',
    header: [
        {id: 'address', title: 'address'},
        {id: 'error', title: 'error'},
    ]
})

const toSend = []
let total = 1
let fail = 0

fs.createReadStream('addresses.csv')
    .pipe(csv())
    .on('data', async (row) => {
        console.log(row)
        toSend.push(row.address)
    })
    .on('end', () => {
        console.log('CSV file successfully processed')
        run()
    })

const run = async() => {
    for (const address of toSend) {
        starton.post(`/smart-contract/${process.env.STARTON_SMART_CONTRACT_ID}/interact`, {
            functionName: 'mint',
            params: [
                address,
                '1000000000000000000000'
            ],
        }).then(response => {
            console.log(address, response.data.transactionHash, total)
            total += 1
            successWriter
                .writeRecords([{
                    address: address,
                    hash: response.data.transactionHash
                }])
        }).catch(err => {
            console.log(err.response.data)
            fail += 1
            failWriter
                .writeRecords([{
                    address: address,
                    hash: err.response.data.error
                }])
        })
        await new Promise(r => setTimeout(r, 500))
    }
}
