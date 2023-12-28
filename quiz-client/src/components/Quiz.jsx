import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStateContex, { stateContext } from "../hooks/useStateContex";
import { BASE_URL, ENDPOINT, createAPIEndpoint } from "../api";

import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { getFormatedTime } from "../helper";

function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContex();
  const navigate = useNavigate();

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    createAPIEndpoint(ENDPOINT.question)
      .fetch()
      .then((res) => {
        setQns(res.data);
        startTimer();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateAnswer = (qnId, optionIndex) => {
    const temp = [...context.selectedOptions];
    temp.push({
      qnId: qnId,
      selected: optionIndex + 1,
    });
    if (qnIndex < 4) {
      setContext({ selectedOptions: [...temp] });
      setQnIndex(qnIndex + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken: timeTaken });
      navigate("/result")
    }
  };
  return (
    <>
      {qns.length != 0 ? (
        <Card
          sx={{
            maxWidth: 640,
            mx: "auto",
            mt: 5,
            "& .MuiCardHeader-action": { m: 0, alignSelf: "center" },
          }}
        >
          <CardHeader
            title={"Question " + (qnIndex + 1) + " of 5"}
            action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
          />
          <Box>
            <LinearProgress
              variant="determinate"
              value={((qnIndex + 1) * 100) / 5}
            />
          </Box>
          {qns[qnIndex].imageName && (
            <CardMedia
              component="img"
              image={BASE_URL + "Images/" + qns[qnIndex].imageName}
              sx={{width: 'auto', m:'10px auto'}}
            />
          )}
          <CardContent>
            <Typography variant="h6">{qns[qnIndex].qnInwords}</Typography>
            <List>
              {qns[qnIndex].options.map((option, index) => (
                <ListItemButton
                  key={index}
                  disableRipple
                  onClick={() => updateAnswer(qns[qnIndex].qnId, index)}
                >
                  <div>
                    <b>{String.fromCharCode(65 + index) + " . "}</b>
                    {option}
                  </div>
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}

export default Quiz;
