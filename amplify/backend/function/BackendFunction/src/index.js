const stripe = require("stripe")(
  "sk_test_51OZ2QdI6RtPAtaAiI6LDlRi84KUNqvCsAOZ1bNC9QOdhkScusIeBVKKaqBz6hP6vJ1MIZdzP99DK5kPz5UqohNHP00kb4SIAD3"
);
exports.handler = async (event) => {
  try {
    // Stripe Payment Intentを作成
    const requestBody = JSON.parse(event.body);
    const amount = requestBody.amount;
    const userEmail = requestBody.userEmail;
    const userId = requestBody.userId;
    const customer = await stripe.customers.create({
      email: userEmail,
      metadata: {
        userId: userId,
      },
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-10-16" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "jpy", // 通貨は必要に応じて変更
      customer: customer.id,
      setup_future_usage: "off_session",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51OZ2QdI6RtPAtaAizmDGAA9BxVe1psgrFen5pr1cR1yHdZMHrh8pY1M3ZgLkoXL9LKhplvgkWJmV4DXJoAto9Zhp00z4kFTF0k",
    };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new Error("Error creating Stripe Payment Intent");
  }
};
