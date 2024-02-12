const stripe = require("stripe")(
  "sk_test_51OZ2QdI6RtPAtaAiI6LDlRi84KUNqvCsAOZ1bNC9QOdhkScusIeBVKKaqBz6hP6vJ1MIZdzP99DK5kPz5UqohNHP00kb4SIAD3"
);
exports.handler = async (event) => {
  try {
    const customerId = "cus_PW8bLln2XmhOAx";
    const amount = 1222;

    // 顧客に関連付けられた支払い方法を取得する
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    // 最初のカード支払い方法を選択する（カードが複数ある場合、適切なものを選択する必要があります）
    const cardPaymentMethod = paymentMethods.data[0];

    // 選択したカード支払い方法のPayment Method IDを取得する
    const paymentMethodId = cardPaymentMethod.id;

    // PaymentIntentを作成する際にPayment Method IDを指定して作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "jpy",
      customer: customerId,
      payment_method: paymentMethodId, // 保存されたPayment Method IDを指定する
      confirm: true,
      off_session: true,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      publishableKey:
        "pk_test_51OZ2QdI6RtPAtaAizmDGAA9BxVe1psgrFen5pr1cR1yHdZMHrh8pY1M3ZgLkoXL9LKhplvgkWJmV4DXJoAto9Zhp00z4kFTF0k",
    };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new Error("Error creating Stripe Payment Intent");
  }
};
