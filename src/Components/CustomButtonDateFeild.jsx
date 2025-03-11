// @ts-nocheck
import { Button, Typography } from "@mui/joy";
import React, { forwardRef, memo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // <--- Import css file
import "./componentStyle.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CustomButtonDateFeild = ({ date, setDate, startLabel }) => {
  const CustomButton = forwardRef(({ value, onClick, className }, ref) => (
    <Button
      startDecorator={
        <Typography
          level="body-sm"
          sx={{
            fontWeight: 600,
            fontFamily: "var(--font-varient)",
            opacity: 0.8,
            paddingLeft: "0.36rem",
            lineHeight: "1.0rem",
            fontSize: "0.81rem",
            color: 'rgba(var(--font-primary-white))'
          }}
        >
          {startLabel}
        </Typography>
      }
      className={className}
      onClick={onClick}
      ref={ref}
      size="sm"
      variant="outlined"
      color="neutral"
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flex: 1,
        cursor: "pointer",
        "--Button-focusedThickness": "1px",
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
    >
      {value}
    </Button>
  ));

  return (
    <DatePicker
      closeOnScroll={true}
      selected={date}
      onChange={(date) => setDate(date)}
      popperPlacement="top"
      customInput={<CustomButton />}
      className="w-full"
      dateFormat="dd-MM-yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      calendarStartDay={1}
    />
  );
};

export default memo(CustomButtonDateFeild);
