import { PrismaClient, type Plans, type Orders } from '@prisma/client';

export type {
	Plans as Plan,
	Orders as Order
};

export const {
	orders,
	plans
} = new PrismaClient();