import formatDate from '../date';
import { truncateText } from '../string';
import { validateTitle, validateQuestions } from '../validate';

import type { Question } from '@/types/templates';

describe('날짜 포맷팅 유틸 함수', () => {
  test('빈 값', () => {
    const date = '';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('');
  });

  test('유효한 값', () => {
    const date = '2025-06-16T06:13:48.596Z';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('2025. 06. 16. 15:13:48');
  });
});

describe('문자열 자르기 유틸 함수', () => {
  test('빈 값', () => {
    const text = '';
    const truncatedText = truncateText(text, 5);
    expect(truncatedText).toBe('');
  });

  test('유효한 값', () => {
    const text = 'Hello, world!';
    const truncatedText = truncateText(text, 5);
    expect(truncatedText).toBe('Hello...');
  });
});

describe('제목, 질문 유효성 검사 유틸 함수', () => {
  test('빈 값', () => {
    const title: string = '';
    const questions: Question[] = [];
    const validateTitleResult = validateTitle(title);
    const validateQuestionsResult = validateQuestions(questions);
    expect(validateTitleResult).toBe('제목을 입력해주세요.');
    expect(validateQuestionsResult).toBe('질문을 추가해주세요.');
  });

  test('유효한 값', () => {
    const title: string = 'OO TV 구매 만족도 조사입니다. 기프티콘 제공';
    const questions: Question[] = [
      {
        id: 'qst-97e53695-bf53-4e90-9453-af4f15070155',
        type: 'radio',
        label: '구매하신 고객님의 연령대를 선택해주세요.',
        options: ['20대', '30대', '40대', '50대', '60대 이상'],
        required: true,
      },
    ];
    const validateTitleResult = validateTitle(title);
    const validateQuestionsResult = validateQuestions(questions);
    expect(validateTitleResult).toBe(null);
    expect(validateQuestionsResult).toBe(null);
  });
});
