import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface EmployeeCardProps {
  name: string;
  income: number;
  smena: string;
  expense: number;
}

const EmployeeCard = ({ name, income, smena, expense }: EmployeeCardProps) => {
  return (
    <Card className="w-full " sx={{ p: 2, backgroundColor: "#FAFAFA", borderLeft: "5px solid #3F51B5" }}>
      <div className="w-full">
        {/* First Line: Name & Income */}
        <div className="flex justify-between w-full gap-3">
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <ArrowUpward sx={{ color: "#388E3C" }} />
            <Typography variant="body1" sx={{ color: "#388E3C" }}>
              {income.toLocaleString()} UZS
            </Typography>
          </Box>
        </div>

        <Divider sx={{ my: 1 }} />

        {/* Second Line: Smena & Expense */}
        <div className="flex justify-between w-full gap-3">
          <Typography variant="body2" color="text.secondary">
            {smena}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <ArrowDownward sx={{ color: "#D32F2F" }} />
            <Typography variant="body1" sx={{ color: "#D32F2F" }}>
              {expense.toLocaleString()} UZS
            </Typography>
          </Box>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
