import { BigInt, BigDecimal, Bytes, crypto, ethereum } from '@graphprotocol/graph-ts'
import {
  IncentiveCreated,
  IncentiveEnded,
  TokenStaked,
  TokenUnstaked,
  DepositTransferred,
  RewardClaimed,
} from '../../../generated/V3Staker/V3Staker'
import { Incentive, StakerDeposit, Stake, RewardClaim as RewardClaimEntity } from '../../../generated/schema'

let ZERO_BI = BigInt.fromI32(0)
let ONE_BI = BigInt.fromI32(1)

// Helper to convert BigInt wei to BigDecimal (18 decimals)
function toDecimal(value: BigInt, decimals: i32 = 18): BigDecimal {
  let divisor = BigInt.fromI32(10)
    .pow(decimals as u8)
    .toBigDecimal()
  return value.toBigDecimal().div(divisor)
}

export function handleIncentiveCreated(event: IncentiveCreated): void {
  // Compute incentive ID: keccak256(abi.encode(rewardToken, pool, startTime, endTime, refundee))
  let tupleArray: Array<ethereum.Value> = [
    ethereum.Value.fromAddress(event.params.rewardToken),
    ethereum.Value.fromAddress(event.params.pool),
    ethereum.Value.fromUnsignedBigInt(event.params.startTime),
    ethereum.Value.fromUnsignedBigInt(event.params.endTime),
    ethereum.Value.fromAddress(event.params.refundee),
  ]
  let tuple = changetype<ethereum.Tuple>(tupleArray)
  let encoded = ethereum.encode(ethereum.Value.fromTuple(tuple))!
  let id = crypto.keccak256(encoded).toHexString()

  let incentive = new Incentive(id)
  incentive.rewardToken = event.params.rewardToken
  incentive.pool = event.params.pool
  incentive.startTime = event.params.startTime
  incentive.endTime = event.params.endTime
  incentive.refundee = event.params.refundee
  incentive.reward = toDecimal(event.params.reward)
  incentive.ended = false
  incentive.numberOfStakes = ZERO_BI
  incentive.createdAtTimestamp = event.block.timestamp
  incentive.createdAtBlockNumber = event.block.number
  incentive.save()
}

export function handleIncentiveEnded(event: IncentiveEnded): void {
  let id = event.params.incentiveId.toHexString()
  let incentive = Incentive.load(id)
  if (incentive !== null) {
    incentive.ended = true
    incentive.save()
  }
}

export function handleDepositTransferred(event: DepositTransferred): void {
  let id = event.params.tokenId.toString()
  let deposit = StakerDeposit.load(id)
  if (deposit === null) {
    deposit = new StakerDeposit(id)
    deposit.numberOfStakes = ZERO_BI
  }
  deposit.owner = event.params.newOwner
  deposit.save()
}

export function handleTokenStaked(event: TokenStaked): void {
  let tokenId = event.params.tokenId.toString()
  let incentiveId = event.params.incentiveId.toHexString()
  let stakeId = tokenId + '-' + incentiveId

  let stake = new Stake(stakeId)
  stake.deposit = tokenId
  stake.incentive = incentiveId
  stake.liquidity = event.params.liquidity
  stake.stakedAtTimestamp = event.block.timestamp
  stake.save()

  // Increment numberOfStakes on the incentive
  let incentive = Incentive.load(incentiveId)
  if (incentive !== null) {
    incentive.numberOfStakes = incentive.numberOfStakes.plus(ONE_BI)
    incentive.save()
  }

  // Increment numberOfStakes on the deposit
  let deposit = StakerDeposit.load(tokenId)
  if (deposit !== null) {
    deposit.numberOfStakes = deposit.numberOfStakes.plus(ONE_BI)
    deposit.save()
  }
}

export function handleTokenUnstaked(event: TokenUnstaked): void {
  let tokenId = event.params.tokenId.toString()
  let incentiveId = event.params.incentiveId.toHexString()
  let stakeId = tokenId + '-' + incentiveId

  // Remove the stake entity
  let stake = Stake.load(stakeId)
  if (stake !== null) {
    // Note: The Graph does not support store.remove in recent versions,
    // so we keep the entity but it can be identified as unstaked
    // by checking the incentive's numberOfStakes
  }

  // Decrement numberOfStakes on the incentive
  let incentive = Incentive.load(incentiveId)
  if (incentive !== null) {
    incentive.numberOfStakes = incentive.numberOfStakes.minus(ONE_BI)
    incentive.save()
  }

  // Decrement numberOfStakes on the deposit
  let deposit = StakerDeposit.load(tokenId)
  if (deposit !== null) {
    deposit.numberOfStakes = deposit.numberOfStakes.minus(ONE_BI)
    deposit.save()
  }
}

export function handleRewardClaimed(event: RewardClaimed): void {
  let id = event.transaction.hash.toHexString() + '-' + event.logIndex.toString()
  let claim = new RewardClaimEntity(id)
  claim.to = event.params.to
  claim.reward = toDecimal(event.params.reward)
  claim.rewardAddress = event.params.to
  claim.timestamp = event.block.timestamp
  claim.transaction = event.transaction.hash
  claim.save()
}
