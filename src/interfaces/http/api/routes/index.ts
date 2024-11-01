import { Router } from 'express';
import userRoutes from './UserRoute';
import authRoutes from './AuthRoute';
import productRoutes from './ProductRoute';
import categoryRoutes from './CategoryRoute'
import inventoryRoutes from './InventoryRoute'
import transactionRoutes from './TransactionRoute'
import reportRoute from './ReportRoute'

const router = Router();

router.use('/', userRoutes);
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/transactions', transactionRoutes)
router.use('/report', reportRoute)


export default router;
