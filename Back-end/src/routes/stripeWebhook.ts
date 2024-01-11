import { Request, Response } from 'express';
import Stripe from 'stripe';
import bcrypt from 'bcrypt';
import { generateUniqueToken } from '../utils/tokenGenerator';
import { findOrCreateUser } from '../services/userService'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const stripeWebhookRoute = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    res.status(500).send("Chave secreta do webhook não configurada.");
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userEmail = session.customer_email;

    if (!userEmail) {
      res.status(400).send("Email do usuário não encontrado na sessão.");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash('senha_aleatoria_ou_padrão', 10);
      const user = await findOrCreateUser(userEmail, hashedPassword);
      const token = generateUniqueToken(user); 

      res.status(201).json({ token: token, user: { email: userEmail, id: user.id } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar usuário após compra' });
    }
  } else {
    res.status(200).json({ received: true });
  }
};
