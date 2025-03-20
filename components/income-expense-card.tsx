import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface IncomeExpenseCardProps {
  title: string;
  value: number;
  type: "income" | "expense";
  variant: "smena-one" | "smena-two";
}

const IncomeExpenseCard = ({ title, value, type, variant }: IncomeExpenseCardProps) => {
  return (
    <Card
    className="w-full"
      sx={{
        backgroundColor: type === "income" ? "#E8F5E9" : "#FFEBEE",
        borderLeft: `5px solid ${type === "income" ? "#4CAF50" : "#F44336"}`,
      }}
    >
      <CardHeader
    sx={{padding: 1}}
        title={
          <Typography variant="h6" sx={{ fontSize: 14, color: type === "income" ? "#388E3C" : "#D32F2F" }}>
            {title}
          </Typography>
        }
        action={
          type === "income" ? (
            <ArrowUpward sx={{ color: "#388E3C" }} />
          ) : (
            <ArrowDownward sx={{ color: "#D32F2F" }} />
          )
        }
      />
      <div className="px-3">
        <Typography variant="h6" fontSize={14} fontWeight="bold">
          {variant === "smena-one" ? "1-smena" : "2-smena"}
        </Typography>
        <Typography variant="h6" fontSize={15} fontWeight="bold">
          {value.toLocaleString()} UZS
        </Typography>
      </div>
    </Card>
  );
};

export default IncomeExpenseCard;
