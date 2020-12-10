import { BigInt } from "@graphprotocol/graph-ts"
import {
  ParsiqToken,
  Approval,
  DecisionPeriodChanged,
  GovernanceBoardChanged,
  GovernedTransfer,
  Paused,
  Resolved,
  ReviewPeriodChanged,
  Reviewing,
  Transfer,
  Unpaused
} from "../generated/ParsiqToken/ParsiqToken"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DOMAIN_SEPARATOR(...)
  // - contract.PERMIT_TYPEHASH(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.decimals(...)
  // - contract.decisionPeriod(...)
  // - contract.decisionPeriods(...)
  // - contract.decreaseAllowance(...)
  // - contract.governanceBoard(...)
  // - contract.governedTransfer(...)
  // - contract.increaseAllowance(...)
  // - contract.name(...)
  // - contract.nonces(...)
  // - contract.paused(...)
  // - contract.pendingGovernanceBoard(...)
  // - contract.reviewPeriod(...)
  // - contract.reviewPeriods(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleDecisionPeriodChanged(
  event: DecisionPeriodChanged
): void {}

export function handleGovernanceBoardChanged(
  event: GovernanceBoardChanged
): void {}

export function handleGovernedTransfer(event: GovernedTransfer): void {}

export function handlePaused(event: Paused): void {}

export function handleResolved(event: Resolved): void {}

export function handleReviewPeriodChanged(event: ReviewPeriodChanged): void {}

export function handleReviewing(event: Reviewing): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}
