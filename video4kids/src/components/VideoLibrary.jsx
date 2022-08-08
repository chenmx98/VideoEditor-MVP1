import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Add from "./Add";
import React from "react";

const VideoLibrary = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Loaded Videos
        </Typography>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Video Clip 1"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Length:
                  </Typography>
                  {"14 seconds"}
                
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Video Clip 2"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Length:
                  </Typography>
                  {"6 seconds"}
                
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Video Clip 3"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Length:
                  </Typography>
                  {"20 seconds"}
                
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          
          <ListItem alignItems="flex-start">
            <Add />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default VideoLibrary;
