import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, PieChart, Pie, Cell, Scatter, ScatterChart, } from 'recharts';
    

const pieData = [
  {name: "Group A", value: 600},
  {name: "Group B", value: 400}
]
    type Props = {}
    
    const Row2 = (props: Props) => {
      const {data: operationalData} = useGetKpisQuery();
      const {data: productData} = useGetProductsQuery();
      const {palette} = useTheme();
      const pieColors = [palette.primary[300], palette.primary[800]]



      const expensesOpNonOp = useMemo(()=>{
        return(
          operationalData && 
          operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) => {
           return{
              name: month.substring(0,3),
              operationalExpenses: operationalExpenses,
              nonOperationalExpenses: nonOperationalExpenses,
           }
          })
        )
      }, [operationalData]);

      const productPrice = useMemo(()=>{
        return(
          productData && 
          productData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) => {
           return{
              name: month.substring(0,3),
              operationalExpenses: operationalExpenses,
              nonOperationalExpenses: nonOperationalExpenses,
           }
          })
        )
      }, [operationalData]);
      

      return (
       <>
      {/* ------------------------------- AREA D ------------------------------------------ */}
        <DashboardBox gridArea="d" >
          <BoxHeader
       title="Operational vs. Non-Operational Expenses" 
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
        <DashboardBox gridArea="e" >
          <BoxHeader
            title="Targets" 
            sideText="+4%"
          />
       <FlexBetween ml="0.2rem">
        <PieChart 
            width={110}
            height={100}            
            margin={{
              top: 0,
              right: -10,
              left: -10,
              bottom: 0,
            }}
          >
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              stroke='none'
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={pieColors[index]}
                />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40% " textAlign="center">
            <Typography variant='h5'>Target Sales</Typography>
            <Typography 
            variant='h3' 
            m="0.3rem 0" 
            color={palette.primary[300]}
            >
              83
            </Typography>
            <Typography variant='h6' mr="0.5rem" ml="0.5rem">Finance goals of the campaign that is desired</Typography>
          </Box>
          <Box  flexBasis="40% " >
            <Typography variant='h5' ml="0.2rem">Losses in revenue</Typography>
            <Typography variant='h6' ml="0.2rem">Losses are down 25%</Typography>
            <Typography variant='h5' mt="0.4rem" ml="0.2rem"> Profit Margins</Typography>
            <Typography variant='h6' mr="0.2rem" ml="0.2rem">Margins are up by 30% from last month</Typography>
           
          </Box>
       </FlexBetween>
          
        </DashboardBox>
      {/* ------------------------------- AREA F ------------------------------------------ */}
        <DashboardBox gridArea="f" >
          <BoxHeader
            title="Prodcut Prices vs. Expenses" 
            sideText="+4%"
          />
          <ResponsiveContainer>
            <ScatterChart
              width={500}
              height={400}            
               margin={{
                top: 15,
                right: 25,
                left: -5,
                bottom: 60,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" width="auto" />
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
              <Scatter activeShape={{ fill: 'red' }} name="A school" data={productPrice} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </DashboardBox>
       </>
      )
    }
    
    export default Row2