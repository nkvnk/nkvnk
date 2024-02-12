const stripe = require("stripe")(
  "sk_test_51OZ2QdI6RtPAtaAiI6LDlRi84KUNqvCsAOZ1bNC9QOdhkScusIeBVKKaqBz6hP6vJ1MIZdzP99DK5kPz5UqohNHP00kb4SIAD3"
);
exports.handler = async (event) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "jpy",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new Error("Error creating Stripe Payment Intent");
  }
};
