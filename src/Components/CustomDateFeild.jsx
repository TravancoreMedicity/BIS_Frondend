// @ts-nocheck
import { Input } from "@mui/joy";
import React from "react";
import { forwardRef } from "react";
import { memo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // <--- Import css file
import "./componentStyle.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CustomDateFeild = ({ date, setDate }) => {
  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <Input
      startDecorator={<CalendarMonthIcon sx={{ cursor: "pointer", color: 'rgba(var(--icon-primary))', opacity: 0.8, }} />}
      value={value}
      className={className}
      ref={ref}
      onClick={onClick}
      size="sm"
      variant="outlined"
      color="neutral"
      fullWidth
      sx={{
        cursor: "pointer",
        "--Input-focusedThickness": "1px",
        backgroundColor: 'rgba(var(--list-bg-color))',
        borderColor: 'rgba(var(--list-border-color))',
        color: "rgba(var(--list-font-color))",
        ':hover': {
          transition: 'none',
          backgroundColor: 'rgba(var(--list-hover-bg-color))',
          borderColor: 'rgba(var(--list-hover-border-color))',
          color: 'rgba(var(--list-hover-font-color))',
        },
        borderWidth: '2.8px',
        borderColor: 'rgba(var(--input-border-color))',
      }}
    />
  ));

  return (
    <DatePicker
      closeOnScroll={true}
      selected={date}
      onChange={setDate}
      customInput={<CustomInput />}
      popperPlacement="top"
      className="ms-0"
      dateFormat="dd/MM/yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      calendarStartDay={1}
    />
  );
};

export default memo(CustomDateFeild);
