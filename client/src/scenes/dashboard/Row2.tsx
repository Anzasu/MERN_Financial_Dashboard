import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, } from 'recharts';
    
    type Props = {}
    
    const Row2 = (props: Props) => {
      const {data} = useGetKpisQuery();
      const {palette} = useTheme();
      const expensesOpNonOp = useMemo(()=>{
        return(
          data && 
          data[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) => {
           return{
              name: month.substring(0,3),
              operationalExpenses: operationalExpenses,
              nonOperationalExpenses: nonOperationalExpenses,
           }
          })
        )
      }, [data]);

      return (
       <>
      {/* ------------------------------- AREA D ------------------------------------------ */}
        <DashboardBox gridArea="d" >
          <BoxHeader
       title="Operational vs. Non-Operational Expenses" 
       subtitle="Monthly comparison over the year"
       sideText="+4%"
       />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}            
          data={expensesOpNonOp}
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
        domain={[0, 13000]}
        />
        <Tooltip />
        <Line 
        type="monotone" 
        dataKey="operationalExpenses" 
        dot={true}
        stroke={palette.primary.main} 
        fillOpacity={1}
        fill="url(#colorRevenue)"
         />
        <Line 
        type="monotone" 
        dataKey="nonOperationalExpenses" 
        dot={true}
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorRevenue)"
         />
      </LineChart>
      </ResponsiveContainer>
        </DashboardBox>
      {/* ------------------------------- AREA E ------------------------------------------ */}
        <DashboardBox gridArea="e" ></DashboardBox>
      {/* ------------------------------- AREA F ------------------------------------------ */}
        <DashboardBox gridArea="f" ></DashboardBox>
       </>
      )
    }
    
    export default Row2