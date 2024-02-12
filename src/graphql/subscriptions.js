/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBank = /* GraphQL */ `
  subscription OnCreateBank($filter: ModelSubscriptionBankFilterInput) {
    onCreateBank(filter: $filter) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBank = /* GraphQL */ `
  subscription OnUpdateBank($filter: ModelSubscriptionBankFilterInput) {
    onUpdateBank(filter: $filter) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBank = /* GraphQL */ `
  subscription OnDeleteBank($filter: ModelSubscriptionBankFilterInput) {
    onDeleteBank(filter: $filter) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserMoney = /* GraphQL */ `
  subscription OnCreateUserMoney(
    $filter: ModelSubscriptionUserMoneyFilterInput
  ) {
    onCreateUserMoney(filter: $filter) {
      id
      delivererm
      Money
      ordererm
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserMoney = /* GraphQL */ `
  subscription OnUpdateUserMoney(
    $filter: ModelSubscriptionUserMoneyFilterInput
  ) {
    onUpdateUserMoney(filter: $filter) {
      id
      delivererm
      Money
      ordererm
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserMoney = /* GraphQL */ `
  subscription OnDeleteUserMoney(
    $filter: ModelSubscriptionUserMoneyFilterInput
  ) {
    onDeleteUserMoney(filter: $filter) {
      id
      delivererm
      Money
      ordererm
      address
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($filter: ModelSubscriptionCardFilterInput) {
    onCreateCard(filter: $filter) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($filter: ModelSubscriptionCardFilterInput) {
    onUpdateCard(filter: $filter) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($filter: ModelSubscriptionCardFilterInput) {
    onDeleteCard(filter: $filter) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePrice = /* GraphQL */ `
  subscription OnCreatePrice($filter: ModelSubscriptionPriceFilterInput) {
    onCreatePrice(filter: $filter) {
      id
      ordererp
      delivererp
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePrice = /* GraphQL */ `
  subscription OnUpdatePrice($filter: ModelSubscriptionPriceFilterInput) {
    onUpdatePrice(filter: $filter) {
      id
      ordererp
      delivererp
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePrice = /* GraphQL */ `
  subscription OnDeletePrice($filter: ModelSubscriptionPriceFilterInput) {
    onDeletePrice(filter: $filter) {
      id
      ordererp
      delivererp
      price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePlace = /* GraphQL */ `
  subscription OnCreatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onCreatePlace(filter: $filter) {
      id
      longitude
      latitude
      OrderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePlace = /* GraphQL */ `
  subscription OnUpdatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onUpdatePlace(filter: $filter) {
      id
      longitude
      latitude
      OrderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePlace = /* GraphQL */ `
  subscription OnDeletePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onDeletePlace(filter: $filter) {
      id
      longitude
      latitude
      OrderId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
      id
      orderer
      deliverer
      content
      judgment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
      id
      orderer
      deliverer
      content
      judgment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
      id
      orderer
      deliverer
      content
      judgment
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onCreateOrder(filter: $filter) {
      id
      product
      brand
      shop
      color
      comment
      price
      userId
      longitude
      latitude
      deadline
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
    onUpdateOrder(filter: $filter) {
      id
      product
      brand
      shop
      color
      comment
      price
      userId
      longitude
      latitude
      deadline
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
    onDeleteOrder(filter: $filter) {
      id
      product
      brand
      shop
      color
      comment
      price
      userId
      longitude
      latitude
      deadline
      createdAt
      updatedAt
      __typename
    }
  }
`;
