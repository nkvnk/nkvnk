/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBank = /* GraphQL */ `
  mutation CreateBank(
    $input: CreateBankInput!
    $condition: ModelBankConditionInput
  ) {
    createBank(input: $input, condition: $condition) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBank = /* GraphQL */ `
  mutation UpdateBank(
    $input: UpdateBankInput!
    $condition: ModelBankConditionInput
  ) {
    updateBank(input: $input, condition: $condition) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBank = /* GraphQL */ `
  mutation DeleteBank(
    $input: DeleteBankInput!
    $condition: ModelBankConditionInput
  ) {
    deleteBank(input: $input, condition: $condition) {
      id
      userId
      BankMoney
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserMoney = /* GraphQL */ `
  mutation CreateUserMoney(
    $input: CreateUserMoneyInput!
    $condition: ModelUserMoneyConditionInput
  ) {
    createUserMoney(input: $input, condition: $condition) {
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
export const updateUserMoney = /* GraphQL */ `
  mutation UpdateUserMoney(
    $input: UpdateUserMoneyInput!
    $condition: ModelUserMoneyConditionInput
  ) {
    updateUserMoney(input: $input, condition: $condition) {
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
export const deleteUserMoney = /* GraphQL */ `
  mutation DeleteUserMoney(
    $input: DeleteUserMoneyInput!
    $condition: ModelUserMoneyConditionInput
  ) {
    deleteUserMoney(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
      id
      customer
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPrice = /* GraphQL */ `
  mutation CreatePrice(
    $input: CreatePriceInput!
    $condition: ModelPriceConditionInput
  ) {
    createPrice(input: $input, condition: $condition) {
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
export const updatePrice = /* GraphQL */ `
  mutation UpdatePrice(
    $input: UpdatePriceInput!
    $condition: ModelPriceConditionInput
  ) {
    updatePrice(input: $input, condition: $condition) {
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
export const deletePrice = /* GraphQL */ `
  mutation DeletePrice(
    $input: DeletePriceInput!
    $condition: ModelPriceConditionInput
  ) {
    deletePrice(input: $input, condition: $condition) {
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
export const createPlace = /* GraphQL */ `
  mutation CreatePlace(
    $input: CreatePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    createPlace(input: $input, condition: $condition) {
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
export const updatePlace = /* GraphQL */ `
  mutation UpdatePlace(
    $input: UpdatePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    updatePlace(input: $input, condition: $condition) {
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
export const deletePlace = /* GraphQL */ `
  mutation DeletePlace(
    $input: DeletePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    deletePlace(input: $input, condition: $condition) {
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
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
