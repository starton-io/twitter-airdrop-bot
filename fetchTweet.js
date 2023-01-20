const {TwitterApi} = require('twitter-api-v2')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
require('dotenv').config()

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
})
let tweetId = process.env.TWITTER_TWEET_ID
let hashtag = process.env.TWITTER_HASHTAG
let winners = {}

const csvWriter = createCsvWriter({
    path: 'addresses.csv',
    header: [
        {id: 'address', title: 'address'},
        {id: 'userId', title: 'userId'},
        {id: 'tweetId', title: 'tweetId'},
        {id: 'date', title: 'date'},
    ],
    // append: true
})


const run = async () => {

    let nextPage = true
    while (nextPage) {
        let url = `tweets/search/recent?query=%23${hashtag}&tweet.fields=id,author_id,created_at,referenced_tweets&since_id=${tweetId}&user.fields=username&max_results=100`
        if (typeof nextPage === "string") {
            url += `&next_token=${nextPage}`
        }
        let replies
        try {
            replies = await twitterClient.v2.get(url)
        } catch (e) {
            console.log(e.data)
            console.log("WARNING! Rate Limited.... Please wait 16min to fetch the next page")
            await new Promise(r => setTimeout(r, 960000))
            replies = await twitterClient.v2.get(url)
        }
        if (replies.data) {
            replies.data.forEach(tweet => {
                if (tweet) {
                    let match = (tweet) => { return tweet.id === tweetId }
                    if (match) {
                        const validAddresses = tweet.text.match(/0x[a-fA-F0-9]{40}/)
                        if (validAddresses) {
                            if (!winners[validAddresses]) {
                                winners[validAddresses] = tweet.author_id
                                winners += 1
                                csvWriter
                                    .writeRecords([{
                                        address: validAddresses,
                                        userId: tweet.author_id,
                                        tweetId: tweet.id,
                                        date: tweet.created_at
                                    }])
                                    .then(() => console.log(`Address was written successfully: ${validAddresses} from date ${tweet.created_at}`))
                            }
                        }
                    }
                }
            })
        }
        if (replies.meta.next_token) {
            nextPage = replies.meta.next_token
            console.log(`Fetch next page: ${replies.meta.next_token}`)
        } else {
            nextPage = false
            console.log("Finished pages")
        }
    }
}

run()
