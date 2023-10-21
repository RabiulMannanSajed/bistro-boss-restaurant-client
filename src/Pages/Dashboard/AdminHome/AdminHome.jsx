import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaConciergeBell, FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-state'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats')
            return res.data;
        }

    })

    // this is for take data  for graph data
    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-data'],
        queryFn: async () => {
            const res = await axiosSecure('/order-stats')
            return res.data;
        }
    })

    // this part is from rechart graph 
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // for pai chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full m-4">
            <Helmet>
                <title>Bistro Boss | Admin Home </title>
            </Helmet>
            <h3 className="text-2xl">Welcome <span className="text-orange-500">Mr.{user.displayName}</span> Admin</h3>
            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaWallet className="text-3xl"></FaWallet>
                    </div>
                    <div className="stat-value">{stats.revenue}</div>
                    <div className="stat-title">Revenue</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-value">{stats.user}</div>
                    <div className="stat-title">Customers</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaConciergeBell className="text-3xl"></FaConciergeBell>
                    </div>
                    <div className="stat-value">{stats.products}</div>
                    <div className="stat-title">Products</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaTruck className="text-3xl"></FaTruck>
                    </div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-title">orders</div>
                </div>

            </div>

            {/* this section for graph */}

            <div className="flex">
                {/* this is bar graph */}
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar
                            dataKey="total"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>

                </div>
                <div className="w-1/2">
                    {/* this is for pai chart */}
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;