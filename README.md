# Uniswap V3 and V3-Tokens Subgraph

## Development

1. Install dependencies
`yarn install`

2. Build a v3 subgraph
`yarn build --network <network> --subgraph-type v3` 

3. Deploy a v3 subgraph
`yarn build --network <network> --subgraph-type v3 --deploy`

4. Build a v3-tokens subgraph
`yarn build --network <network> --subgraph-type v3-tokens`

5. Deploy a v3-tokens subgraph
`yarn build --network <network> --subgraph-type v3-tokens --deploy`

Note: Deployments will fail if there are uncommitted changes in the subgraph. Please commit your changes before deploying.


## KalyChain Deployment Guide

### 1. Infrastructure Setup (Local Graph Node)
We use a local Graph Node connected to the KalyChain RPC.

1.  **Start Graph Node, IPFS, and Postgres:**
    ```bash
    docker-compose up -d
    ```
    *   Graph Node: `http://127.0.0.1:8020` (JSON-RPC)
    *   IPFS: `http://127.0.0.1:5001`

### 2. Deployment

1.  **Export Environment Variables:**
    The deployment script requires these variables to be set (pointing to your local node):
    ```bash
    export ALCHEMY_DEPLOY_URL="http://127.0.0.1:8020"
    export ALCHEMY_IPFS_URL="http://127.0.0.1:5001"
    ```

2.  **Create the Subgraph (First Run Only):**
    ```bash
    npx graph create --node http://127.0.0.1:8020/ v3-subgraph-kalychain
    ```

3.  **Deploy:**
    Run the build script with the `--deploy` flag.
    ```bash
    npm run build -- --network kalychain-testnet --subgraph-type v3 --deploy
    ```

### 3. Configuration Files
*   **Network Config**: `config/kalychain-testnet/config.json` (Start block, Factory address)
*   **Chain Constants**: `config/kalychain-testnet/chain.ts` (WKLC, Stablecoins, Pricing Thresholds)
*   **Environment**: `config/kalychain-testnet/.subgraph-env` (Subgraph names)
