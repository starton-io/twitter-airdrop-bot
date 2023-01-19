
# Starton Twitter Quote-Retweet airdrop bot

This bot allows you to airdrop tokens (ERC20) or NFTs (ERC721 / ERC1155) to your community.
People need to quote-retweet a specific tweet with a specific hashtag to receive the tokens or the NFT.

# Requirements
## Twitter
You need to have a Twitter Developper Account.
You can apply here: https://developer.twitter.com/en/apply-for-access

When you have your credentials you need to set them in a `.env` file

- `TWITTER_APP_KEY=`

- `TWITTER_APP_SECRET=`

- `TWITTER_ACCESS_TOKEN=`

- `TWITTER_ACCESS_SECRET=`

You also need to set the **tweet id** and **hashtag** related to your contest.

- `TWITTER_TWEET_ID=` : You can find it in the url of your already published tweet

- `TWITTER_HASHTAG=` : Just the hashtag string without `#`

## Starton Connect
You need to have a Starton Connect account.
You can create a free account [here](https://connect.starton.io)

You can create an API key in the `Developer` section.
You will need to add it to the `.env` file aswell.

- `STARTON_API_KEY=`

## Deploy or import a smart contract on Starton

You can now deploy a new contract or import an existing one in Starton's [`Deploy` section](https://connect.starton.io/deploy).

Once deployed you should add in the `.env` file:

- `STARTON_SMART_CONTRACT_ADDRESS=`
- `STARTON_SMART_CONTRACT_NETWORK=`
- `STARTON_SMART_CONTRACT_SIGNER=`
- `TOKEN_AMOUNT=`

# Start the bot
## Get the winners
When the contest has ended, you just have to run the following script in order to get the list of all participating addresses.

```bash
git clone https://github.com/starton-io/twitter-airdrop-bot
cd twitter-airdrop-bot
yarn install (or npm install)
node fetchTweet.js
```

It will fetch all the tweets with the specific hashtag you defined in the `.env` file and then check if they are quote retweets of our initial tweet.

If this is the case, it will parse the tweets to find an address and save it in the file `addresses.csv`.

## Send the tokens
All the winners should now be saved in the `address.csv` file.
You can modify this file in order to whitelist / blacklist certain addresses or filter the addresses based on your custom criterias.

All the addresses from this file will now receive tokens when running the following command :
```bash
node sendToken.js
```

## Authors

- [@cervantescedric - CTO @starton.io](https://linkedin.com/in/cedriccervantes/)
