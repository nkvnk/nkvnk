/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBank = /* GraphQL */ `
  query GetBank($id: ID!) {
    getBank(id: $id) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBanks = /* GraphQL */ `
  query ListBanks(
    $filter: ModelBankFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBanks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        BankMoney
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserMoney = /* GraphQL */ `
  query GetUserMoney($id: ID!) {
    getUserMoney(id: $id) {
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
export const listUserMonies = /* GraphQL */ `
  query ListUserMonies(
    $filter: ModelUserMoneyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserMonies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        delivererm
        Money
        ordererm
        address
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customer
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPrice = /* GraphQL */ `
  query GetPrice($id: ID!) {
    getPrice(id: $id) {
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
export const listPrices = /* GraphQL */ `
  query ListPrices(
    $filter: ModelPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ordererp
        delivererp
        price
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlace = /* GraphQL */ `
  query GetPlace($id: ID!) {
    getPlace(id: $id) {
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
export const listPlaces = /* GraphQL */ `
  query ListPlaces(
    $filter: ModelPlaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        longitude
        latitude
        OrderId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
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
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        orderer
        deliverer
        content
        judgment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
