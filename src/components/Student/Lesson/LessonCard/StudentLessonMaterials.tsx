import { useGetMaterialsByLessonIdQuery } from '@/redux/courses/materialsApi';
import DownloadIcon from '@mui/icons-material/Download';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Paper,
} from '@mui/material';
import React from 'react';
import { Material } from 'types/course';

interface MaterialsListProps {
  courseId: number;
  lessonId: number;
}

const StudentLessonMaterials: React.FC<MaterialsListProps> = ({
  courseId,
  lessonId,
}) => {
  const { data: { data: materials = [] } = {}, isLoading } =
    useGetMaterialsByLessonIdQuery({
      courseId,
      lessonId,
    });

  return (
    !isLoading && (
      <List>
        {materials.map((material: Material) => (
          <ListItem key={material.id}>
            <Paper
              variant="outlined"
              square
              sx={{
                width: '100%',
                p: 1,
                bgcolor: 'action.hover',
                whiteSpace: 'pre-line',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ListItemText
                primary={
                  <Link
                    href={material.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {material.title}
                  </Link>
                }
              />
              <ListItemIcon>
                <IconButton
                  aria-label={`Download ${material.title}`}
                  component="a"
                  href={material.sourceUrl}
                  download={material.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon />
                </IconButton>
              </ListItemIcon>
            </Paper>
          </ListItem>
        ))}
      </List>
    )
  );
};

export default StudentLessonMaterials;
