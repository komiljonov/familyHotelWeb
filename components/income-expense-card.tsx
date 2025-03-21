import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface IncomeExpenseCardProps {
  title: string;
  value: number;
  type: string;
  variant: string;
  order_count: number;
}

const IncomeExpenseCard = ({
  title,
  value,
  type,
  variant,
  order_count,
}: IncomeExpenseCardProps) => {
  return (
    <Card
      className="w-full"
      sx={{
        backgroundColor: type === "income" ? "#DAFEEF" : "#FEE6E2",
        boxShadow: "none",
        borderRadius: "8px",
      }}
    >
      <CardHeader
        sx={{ padding: "12px" }}
        title={
          <Typography
            variant="h6"
            sx={{
              fontSize: 14,
              color: type === "income" ? "#1ACD81" : "#EF5C44",
            }}
          >
            {title}
          </Typography>
        }
        action={
          type === "income" ? (
            <ArrowUpward sx={{ color: "#1ACD81" }} className="rotate-[-135deg]" />
          ) : (
            <ArrowDownward sx={{ color: "#EF5C44" }} className="rotate-[-135deg]" />
          )
        }
      />
      <div className="px-3 pb-3">
        <div className="w-full flex gap-2 flex-col justify-between">
          <Typography variant="h6" color={type === "income" ? "#1ACD81" : "#EF5C44"} fontSize={15} fontWeight="bold">
            {value.toLocaleString()} UZS
          </Typography>
          <Typography variant="h6" fontSize={12} fontWeight="bold" className="flex justify-between w-full">
            <span>Buyurtmalar:</span> <span>{order_count} ta</span>
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default IncomeExpenseCard;
