import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  ListItemText,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { FC, useState } from 'react';

import { Question } from '@/types/tests';

import QuestionEditForm from './QuestionEditForm';

type Props = {
  idx: number;
  question: Question;
};

const QuestionItem: FC<Props> = ({ question }) => {
  const { questionText, id } = question;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id={id?.toString()}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <QuestionMarkIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={questionText}
              // secondary={setPreviewString(questionText, 50)}
            />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails>
          {expanded && (
            <QuestionEditForm
              btnCaption="Save question"
              question={question}
              onChangeExpanded={() => setExpanded(!expanded)}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionItem;
