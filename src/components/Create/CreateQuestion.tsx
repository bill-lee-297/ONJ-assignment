import { useCreateStore } from '@/store/createStore';
import QuestionLabel from './QuestionLabel';
import QuestionContent from './QuestionContents';
import QuestionToolbar from './QuestionToolbar';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoMdAdd } from 'react-icons/io';

const CreateQuestion = () => { 
  const setQuestions = useCreateStore(state => state.setQuestions);
  const questions = useCreateStore(state => state.questions);


  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `qst-${uuidv4()}`,
        type: 'text',
        label: '제목 없는 질문',
      },
    ]);
  };

  useEffect(() => {
    if(questions.length === 0) {
      handleAddQuestion();
    }
  }, [questions]);


  return (
    <div className="flex flex-col gap-10">
      {questions.map(question => (
        <div key={question.id} className="flex flex-col gap-2 border border-gray-300 rounded px-4 py-5">
          <QuestionLabel question={question} />
          <QuestionContent question={question} />
          <QuestionToolbar question={question} />
        </div>
      ))}

      <div className="flex items-center justify-center mt-5">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="border-gray-200 border-2 rounded-full p-2 hover:bg-gray-100 cursor-pointer"
        >
          <IoMdAdd size={24} className="text-gray-500 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default CreateQuestion;
