import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Line,
  LineChart,
  BarChart,
  Bar,} from 'recharts';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import BoxHeader from '@/components/BoxHeader';

type Props = {}



const Row1 = (props: Props) => {
    const {data} = useGetKpisQuery();
    const {palette} = useTheme();
    const revenueExpenses = useMemo(()=>{
      return(
        data && 
        data[0].monthlyData.map(({month, revenue, expenses}) => {
          return{
            name: month.substring(0,3),
            revenue: revenue,
            expenses: expenses,
          }
        })
      )
    }, [data]);

    const profitExpenses = useMemo(()=>{
      return(
        data && 
        data[0].monthlyData.map(({month, revenue, expenses}) => {
          return{
            name: month.substring(0,3),
            profit: revenue - expenses,
            expenses: expenses,
          }
        })
      )
    }, [data]);

    const revenueMonth = useMemo(()=>{
      return(
        data && 
        data[0].monthlyData.map(({month, revenue}) => {
          return{
            name: month.substring(0,3),
            revenue: revenue,
          }
        })
      )
    }, [data]);

  return (
   <>
   {/* ------------------------------- AREA A ------------------------------------------ */}
   <DashboardBox gridArea="a" >
      <BoxHeader
       title="Revenue and Expenses" 
       subtitle="top line represents revenue, bottom line represents expenses"
       sideText="+4%"
       />
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart
          width={500}
          height={400}            
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor={palette.primary[300]}
            stopOpacity={0.5}
            />
            <stop 
            offset="95%" 
            stopColor={palette.primary[300]}
            stopOpacity={0}
            />
          </linearGradient>
           <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop 
            offset="5%" 
            stopColor={palette.primary[300]}
            stopOpacity={0.5}
            />
            <stop 
            offset="95%" 
            stopColor={palette.primary[300]}
            stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis 
        dataKey="name" 
        tickLine={false} 
        style={{fontSize: "10px" }}
        />
        <YAxis 
        tickLine={false} 
        axisLine={{strokeWidth:"0"}}
        style={{fontSize: "10px" }}
        domain={[8000, 23000]}
        />
        <Tooltip />
        <Area 
        type="monotone" 
        dataKey="revenue" 
        dot={true}
        stroke={palette.primary.main} 
        fillOpacity={1}
        fill="url(#colorRevenue)"
         />
        <Area 
        type="monotone" 
        dataKey="expenses" 
        dot={true}
        stroke={palette.primary.main} 
        fillOpacity={1}
        fill="url(#colorRevenue)"
         />
      </AreaChart>
    </ResponsiveContainer>
   </DashboardBox>
   {/* ------------------------------- AREA B ------------------------------------------ */}
   <DashboardBox gridArea="b" >
    <BoxHeader
       title="Profit and Expenses" 
       subtitle="top line represents expenses, bottom line represents profit"
       sideText="+4%"
       />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}            
          data={profitExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -5,
            bottom: 60,
          }}
      >
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        
        <XAxis 
        dataKey="name" 
        tickLine={false} 
        style={{fontSize: "10px" }}
        />
        <YAxis 
        tickLine={false} 
        axisLine={false}
        style={{fontSize: "10px" }}
        domain={[0, 18000]}
        />
        <Tooltip />
         <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
        <Line 
        type="monotone" 
        dataKey="profit" 
        dot={true}
        stroke={palette.primary.main} 
        fillOpacity={1}
        fill="url(#colorRevenue)"
         />
        <Line 
        type="monotone" 
        dataKey="expenses" 
        dot={true}
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorRevenue)"
         />
      </LineChart>
      </ResponsiveContainer>
   </DashboardBox>
      {/* ------------------------------- AREA C ------------------------------------------ */}

   <DashboardBox gridArea="c" >
    <BoxHeader
       title="Revenue Month By Month" 
       subtitle="top line represents revenue, bottom line represents expenses"
       sideText="+4%"
       />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={400}            
          data={revenueMonth}
          margin={{
            top: 15,
            right: 25,
            left: -5,
            bottom: 60,
          }}
        >
          <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
      <CartesianGrid vertical={false} stroke={palette.grey[800]} />
      <XAxis 
        dataKey="name" 
        tickLine={false} 
        style={{fontSize: "10px" }}
        />
        <YAxis 
        tickLine={false} 
        axisLine={false}
        style={{fontSize: "10px" }}
        domain={[0, 23000]}
        />
      <Tooltip />
      <Bar 
      dataKey="revenue" 
      fill="url(#colorRevenue)"
      />
    </BarChart>
      </ResponsiveContainer>
   </DashboardBox>
   </>
  )
}

export default Row1