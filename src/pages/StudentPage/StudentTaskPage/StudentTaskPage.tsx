/* eslint-disable no-console */
import { HOMEWORK_DESCR } from '@/consts';
import { tasksApi } from '@/redux/tasks';
import { BreadCrumbsRouter } from 'components/core';
import CustomFileInput from 'components/core/CustomFileInput';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ResponseTaskDetails,
  ResponseHomeworkDetails,
  ResponseTestDetails,
} from 'types/task';

import {
  PageContent,
  SubjectAndLessonOfHomework,
  DescriptionTitle,
  HomeworkDescription,
  HomeworkSourceLink,
  FileInputWrapper,
  Form,
  SubmitButton,
  HomeworkSubmitDescription,
  TestPageLink,
  Wrapper,
  MaxScore,
  TestStatus,
  GroupWrapper,
  YourTestScores,
  HomeworkStatus,
  YourHomeworkGrade,
  SubmittedHomeworkLink,
  NumberOfCorrectAnswers,
  NumberOfQuestions,
  Score,
  Result,
} from './StudentTaskPage.styled';

function isHomeworkDetails(
  data: ResponseTaskDetails | undefined
): data is ResponseHomeworkDetails {
  return data?.taskType !== 'test';
}
function isTestDetails(
  data: ResponseTaskDetails | undefined
): data is ResponseTestDetails {
  return data?.taskType !== 'homework';
}

const StudentTaskPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { taskId } = useParams();

  const response = tasksApi.useGetTaskForStudentByIdQuery(Number(taskId));
  const [sendHomework] = tasksApi.useSendHomeworkMutation();

  const data: ResponseTaskDetails | undefined = response?.data?.data;

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      console.log('No file selected');

      return;
    }
    sendHomework({ taskId: taskId as string, file: selectedFile });
  };

  if (data !== undefined && isTestDetails(data)) {
    return (
      <PageContent>
        <BreadCrumbsRouter />
        <Form>
          <SubjectAndLessonOfHomework>
            {data.courseTitle} / {data.lessonTitle} / {data.test.title}
          </SubjectAndLessonOfHomework>
          <GroupWrapper>
            <DescriptionTitle>Test description</DescriptionTitle>
            <HomeworkDescription>{data.test.description}</HomeworkDescription>
          </GroupWrapper>
          <GroupWrapper>
            <DescriptionTitle>Details</DescriptionTitle>
            <HomeworkDescription>
              <Wrapper>
                {data.status === 'done' && (
                  <>
                    <TestStatus>
                      - Status: Completed (awaiting teacher review)
                    </TestStatus>
                  </>
                )}
                {data.status === 'check' && (
                  <>
                    <TestStatus>
                      - Status:{' '}
                      <Result>Completed and Checked by Teacher</Result>
                    </TestStatus>
                    <YourTestScores>
                      - Your test grade given by the teacher:{' '}
                      <Result>{data.grade}</Result>
                    </YourTestScores>
                  </>
                )}
                {data.status === 'null' && (
                  <TestStatus>
                    - Status: <Result>Not Started</Result>
                  </TestStatus>
                )}

                <MaxScore>
                  - Max possible score based on automatic calculation:{' '}
                  <Result>{data.test.maxScores}</Result>
                </MaxScore>
                {(data.status === 'done' || data.status === 'check') && (
                  <>
                    <Score>
                      - Your score based on automatic calculation:{' '}
                      <Result>{Math.round(data.test.scores)}</Result>
                    </Score>
                    <NumberOfQuestions>
                      - Number of questions:{' '}
                      <Result>{data.test.totalQuestions}</Result>
                    </NumberOfQuestions>
                    <NumberOfCorrectAnswers>
                      - Correct answers given:{' '}
                      <Result>{data.test.correctAnswers}</Result>
                    </NumberOfCorrectAnswers>
                  </>
                )}
              </Wrapper>
            </HomeworkDescription>
          </GroupWrapper>

          <TestPageLink to="test">
            {data.status !== 'null' ? 'Answers History' : 'Run Test'}
          </TestPageLink>
        </Form>
      </PageContent>
    );
  }

  if (data !== undefined && isHomeworkDetails(data)) {
    return (
      <PageContent>
        <BreadCrumbsRouter />
        <Form>
          <SubjectAndLessonOfHomework>
            {data.courseTitle} / {data.lessonTitle} / {data.homeworks.title}
          </SubjectAndLessonOfHomework>
          <GroupWrapper>
            <DescriptionTitle>Homework description</DescriptionTitle>
            <HomeworkDescription>{HOMEWORK_DESCR}</HomeworkDescription>
          </GroupWrapper>
          <HomeworkSourceLink href={data.homeworks.sourceURL} download>
            Get materials for homework
          </HomeworkSourceLink>
          {data.status === 'null' && (
            <>
              <GroupWrapper>
                <DescriptionTitle>How to submit homework</DescriptionTitle>
                <HomeworkSubmitDescription>
                  {`Below, there is a file input
                  element. Click on it to open the file selection dialog. In the
                  dialog, select the file that you want to submit as your homework
                  assignment. After selecting the file, you will see that the name
                  of the selected file appears next to the file input element. Once
                  the file is selected, click the "Submit for review" button.`}
                </HomeworkSubmitDescription>
                <FileInputWrapper>
                  <CustomFileInput onFileChange={handleFileChange} />
                </FileInputWrapper>
              </GroupWrapper>
              <SubmitButton
                disabled={!selectedFile}
                size="small"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit for review
              </SubmitButton>
            </>
          )}
          {data.status !== 'null' && (
            <>
              <GroupWrapper>
                <DescriptionTitle>Homework details</DescriptionTitle>
                <HomeworkDescription>
                  <Wrapper>
                    <HomeworkStatus>
                      - Status:{' '}
                      <Result>
                        {data.status === 'done'
                          ? 'Completed (awaiting teacher review)'
                          : 'Submitted and Checked by Teacher'}
                      </Result>
                    </HomeworkStatus>
                    {data.status === 'check' && (
                      <YourHomeworkGrade>
                        - Your grade is: <Result>{data.grade}</Result>
                      </YourHomeworkGrade>
                    )}
                  </Wrapper>
                </HomeworkDescription>
              </GroupWrapper>
              <SubmittedHomeworkLink href={data.homeworks.homeworkUrl} download>
                Download submitted homework
              </SubmittedHomeworkLink>
            </>
          )}
        </Form>
      </PageContent>
    );
  }
};

export default StudentTaskPage;
