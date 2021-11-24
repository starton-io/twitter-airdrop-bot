
# Starton Twitter Quote-Retweet airdrop bot

This bot allow you to airdrop Token (ERC20) or NFT (ERC721 / ERC1155) to your community.
People need to quote-retweet a specific tweet with a specific hashtag to receive token or NFT.

# Requirement
## Twitter
You need to have a Twitter Developper Account.
You can apply here: https://developer.twitter.com/en/apply-for-access

When you have your credentials you need to set them on a .env file

`TWITTER_APP_KEY=`

`TWITTER_APP_SECRET=`

`TWITTER_ACCESS_TOKEN=`

`TWITTER_ACCESS_SECRET=`

You also need to set the tweet id and hashtag related to you contest.

`TWITTER_TWEET_ID=` You can find it in the url of your tweet

`TWITTER_HASHTAG=`

## Starton Connect
You need to have a Starton Connect account.
You can create a free account here: https://connect.starton.io

You can then deploy a new contract or import an existing one.
When you have your credentials you need to set them on a .env file

`STARTON_API_KEY=`

`STARTON_SMART_CONTRACT_ID=` you can find it in the url of you smart contract

# Launch the bot
## Get the winners
When the contest is ended, you just have to run the following script.
It will fetch all the tweet with a specific hashtag then check if this is a quote retweet of our initial tweet.
If it is the case, it will parse the tweet to find an address and save it in the file "addresses.csv" if it is the case.

```bash
git clone <repo>
cd <repo>
yarn install (or npm install)
node fetchTweet.js
```

## Send the tokens
All the winners are saved on the address.csv file. You can add or remove people before sending it.
To send the token you just need to run
```bash
node sendToken.js
```

## Authors

- [@cervantescedric - CTO @starton.io](https://linkedin.com/in/cedriccervantes/)

