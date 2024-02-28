const { error } = require("console")
const FromData = require("form-data")
const fs = require("fs")
const fetch = require("node-fetch")
const { fileURLToPath } = require("url")
require("dotenv").config()

const uploadFile = async (file) => {
    try {
        const data = new FormData()
        data.append('file', fs.createReadStream(file))
        data.append('pinataMetadata', '{"name": "Cutie NFT Image"')

        const res = await fetch ("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${process.env.PINATA_JWT}`,
            },
            body: data
        })
        resData = await res.json()
        console.log("File uploaded, CID:", resData.IpfsHash)
        return resData.IpfsHash
    } catch (error){
        console.log(error)

    }
       
}

uploadFile("./Cutie.jpg")