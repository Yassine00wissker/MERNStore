import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const getStatistics = async (req, res) => {
    try {
        // Total counts
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Users by role
        const usersByRole = await User.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ]);

        const buyersCount = usersByRole.find(u => u._id === "buyer")?.count || 0;
        const sellersCount = usersByRole.find(u => u._id === "seller")?.count || 0;
        const adminsCount = usersByRole.find(u => u._id === "admin")?.count || 0;

        // Orders statistics
        const ordersByStatus = await Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const pendingOrders = ordersByStatus.find(o => o._id === "pending")?.count || 0;
        const shippedOrders = ordersByStatus.find(o => o._id === "shipped")?.count || 0;
        const deliveredOrders = ordersByStatus.find(o => o._id === "delivered")?.count || 0;

        // Payment statistics
        const paidOrders = await Order.countDocuments({ isPaid: true });
        const unpaidOrders = await Order.countDocuments({ isPaid: false });

        // Revenue statistics
        const revenueStats = await Order.aggregate([
            {
                $match: { isPaid: true }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalprice" },
                    averageOrderValue: { $avg: "$totalprice" }
                }
            }
        ]);

        const totalRevenue = revenueStats[0]?.totalRevenue || 0;
        const averageOrderValue = revenueStats[0]?.averageOrderValue || 0;

        // Products by category
        const productsByCategory = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        // Recent orders (last 10)
        const recentOrders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 })
            .limit(10)
            .select("-__v");

        // Low stock products (quantity < 10)
        const lowStockProducts = await Product.countDocuments({ quantity: { $lt: 10 } });

        // Payment methods
        const paymentMethods = await Order.aggregate([
            {
                $group: {
                    _id: "$paymentInfo.method",
                    count: { $sum: 1 }
                }
            }
        ]);

        const creditCardOrders = paymentMethods.find(p => p._id === "creditCard")?.count || 0;
        const paypalOrders = paymentMethods.find(p => p._id === "paypal")?.count || 0;

        // Additional Product Statistics
        // Total inventory value
        const inventoryStats = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalInventoryValue: { $sum: { $multiply: ["$price", "$quantity"] } },
                    totalQuantity: { $sum: "$quantity" },
                    averagePrice: { $avg: "$price" }
                }
            }
        ]);

        const totalInventoryValue = inventoryStats[0]?.totalInventoryValue || 0;
        const totalQuantity = inventoryStats[0]?.totalQuantity || 0;
        const averageProductPrice = inventoryStats[0]?.averagePrice || 0;

        // Top selling products (by order count)
        const topSellingProducts = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.product",
                    totalSold: { $sum: "$items.quantity" },
                    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $project: {
                    productName: "$product.name",
                    productId: "$_id",
                    totalSold: 1,
                    totalRevenue: 1
                }
            }
        ]);

        // User Statistics - New users this month
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);
        
        const newUsersThisMonth = await User.countDocuments({
            createdAt: { $gte: currentMonth }
        });

        // Orders by month (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const ordersByMonth = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalprice" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Revenue by month (last 6 months) - only paid orders
        const revenueByMonth = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    revenue: { $sum: "$totalprice" },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Orders today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const ordersToday = await Order.countDocuments({
            createdAt: { $gte: today }
        });

        // Revenue today
        const revenueTodayStats = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                    createdAt: { $gte: today }
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$totalprice" }
                }
            }
        ]);
        const revenueToday = revenueTodayStats[0]?.revenue || 0;

        // Top sellers (users with most products)
        const topSellers = await Product.aggregate([
            {
                $group: {
                    _id: "$owner",
                    productCount: { $sum: 1 }
                }
            },
            { $sort: { productCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "seller"
                }
            },
            { $unwind: "$seller" },
            {
                $project: {
                    sellerName: "$seller.name",
                    sellerEmail: "$seller.email",
                    productCount: 1
                }
            }
        ]);

        // Payment status breakdown
        const paymentStatusBreakdown = await Order.aggregate([
            {
                $group: {
                    _id: "$paymentInfo.status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const paymentPending = paymentStatusBreakdown.find(p => p._id === "pending")?.count || 0;
        const paymentCompleted = paymentStatusBreakdown.find(p => p._id === "completed")?.count || 0;
        const paymentFailed = paymentStatusBreakdown.find(p => p._id === "failed")?.count || 0;

        res.status(200).json({
            overview: {
                totalProducts,
                totalUsers,
                totalOrders,
                totalRevenue: totalRevenue.toFixed(2),
                averageOrderValue: averageOrderValue.toFixed(2),
                revenueToday: revenueToday.toFixed(2),
                ordersToday
            },
            users: {
                total: totalUsers,
                buyers: buyersCount,
                sellers: sellersCount,
                admins: adminsCount,
                newThisMonth: newUsersThisMonth
            },
            orders: {
                total: totalOrders,
                pending: pendingOrders,
                shipped: shippedOrders,
                delivered: deliveredOrders,
                paid: paidOrders,
                unpaid: unpaidOrders,
                today: ordersToday
            },
            products: {
                total: totalProducts,
                lowStock: lowStockProducts,
                byCategory: productsByCategory,
                totalInventoryValue: totalInventoryValue.toFixed(2),
                totalQuantity,
                averagePrice: averageProductPrice.toFixed(2),
                topSelling: topSellingProducts
            },
            payments: {
                creditCard: creditCardOrders,
                paypal: paypalOrders,
                pending: paymentPending,
                completed: paymentCompleted,
                failed: paymentFailed
            },
            sellers: {
                topSellers
            },
            trends: {
                ordersByMonth,
                revenueByMonth
            },
            recentOrders
        });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ 
            message: "Error fetching statistics", 
            error: error.message 
        });
    }
};

export { getStatistics };
