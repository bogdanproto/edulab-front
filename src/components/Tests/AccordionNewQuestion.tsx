import AddBoxIcon from '@mui/icons-material/AddBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { FC } from 'react';

import QuestionEditForm from './QuestionEditForm';

type Props = {
  testId: number;
  expanded: boolean;
  onChangeExpanded: () => void;
};

export const AccordionNewQuestion: FC<Props> = ({
  // testId,
  expanded,
  onChangeExpanded,
}) => {
  return (
    <>
      <Accordion expanded={expanded} onChange={onChangeExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="testId">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AddBoxIcon color="success" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="New Question"
              secondary="Create new question"
            />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails>
          {expanded && <QuestionEditForm onChangeExpanded={onChangeExpanded} />}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
