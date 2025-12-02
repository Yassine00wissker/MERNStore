import paypal from '@paypal/checkout-server-sdk';

// Configure PayPal SDK environment
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('PayPal credentials not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env');
    }

    // Use sandbox for development, production for live
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// Create PayPal client
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

export { client };
