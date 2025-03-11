import { Box } from "@mui/joy";
import React from "react";
import { baseColor } from "../Constant/Constant";

const Colors = () => {
  return (
    <Box
      sx={{
        height: 200,
      }}
    >
      <Box
        sx={{ bgcolor: baseColor.primary, color: "white" }}
        className="flex flex-1 h-[20%] border "
      >
        primary
      </Box>
      <Box
        sx={{ bgcolor: baseColor.secondary }}
        className="flex flex-1 h-[20%] border "
      >
        secondary
      </Box>
      <Box
        sx={{ bgcolor: baseColor.primarylight }}
        className="flex flex-1 h-[20%] border "
      >
        primarylight
      </Box>
      <Box
        sx={{ bgcolor: baseColor.secondarylight }}
        className="flex flex-1 h-[20%] border "
      >
        secondarylight
      </Box>
      <Box
        sx={{ bgcolor: baseColor.primaryfont }}
        className="flex flex-1 h-[20%] border "
      >
        primaryfont
      </Box>
      <Box
        sx={{ bgcolor: baseColor.secondaryfont }}
        className="flex flex-1 h-[20%] border "
      >
        secondaryfont
      </Box>
      <Box
        sx={{ bgcolor: baseColor.ultralight }}
        className="flex flex-1 h-[20%] border "
      >
        ultralight
      </Box>
      <Box
        sx={{ bgcolor: baseColor.fontGrey }}
        className="flex flex-1 h-[20%] border "
      >
        fontGrey
      </Box>
      <Box
        sx={{ bgcolor: baseColor.fontPink }}
        className="flex flex-1 h-[20%] border "
      >
        fontPink
      </Box>
      <Box
        sx={{ bgcolor: '#e9fcf6' }}
        className="flex flex-1 h-[20%] border "
      >
        primaryBackground
      </Box>
      <Box
        sx={{ bgcolor: '#119c75' }}
        className="flex flex-1 h-[20%] border "
      >
        backgroundFont
      </Box>


    </Box>
  );
};

export default Colors;
